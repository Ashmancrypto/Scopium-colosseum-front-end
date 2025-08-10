import { BACKEND_URL, TOKEN_DECIMALS, TOKEN_TOTAL_SUPPLY, TREASURY_WALLET } from "../../../contexts/contractsOnSolana/contracts/constants.js";
import {
    Keypair,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import {
    TOKEN_PROGRAM_ID,
    MINT_SIZE,
    AuthorityType,
    getMinimumBalanceForRentExemptMint,
    createInitializeMintInstruction,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction,
} from "@solana/spl-token";
import {
    createCreateMetadataAccountV3Instruction,
    PROGRAM_ID
} from "@metaplex-foundation/mpl-token-metadata";
import { connection } from "../../../config/configSolana/index.js";
import { getMintPair } from "../../../api/token/index.js";
import { PublicKey } from "@solana/web3.js";

async function generateVanityKeypair(suffix = "Ai") {
    let attempts = 0;
    let keypair;
    let pubkeyBase58;

    while (true) {
        keypair = Keypair.generate();
        pubkeyBase58 = keypair.publicKey.toBase58();
        attempts++;

        if (pubkeyBase58.endsWith(suffix)) {
            return keypair;
        }

        if (attempts % 1000 === 0) {
            console.log(`Searching for vanity address... ${attempts} attempts`);
        }
    }
}

const createMint = async (mintAuthority, freezeAuthority, decimals, category) => {
    let keypair;
    if (category === 5) {
        keypair = Keypair.generate();
    } else if (category === 3) {
        // Generate vanity keypair ending in "Ai"
        keypair = await generateVanityKeypair("Ai");
    } else {
        // Fetch from backend
        keypair = await getMintPair(category);
    }

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const txs = [
        SystemProgram.createAccount({
            fromPubkey: mintAuthority,
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID
        }),
        createInitializeMintInstruction(
            keypair.publicKey,
            decimals,
            mintAuthority,
            freezeAuthority,
            TOKEN_PROGRAM_ID
        )
    ];

    return { keypair, txs };
};

const mintToken = async (mint, mintAuthority, targetWallet, mintAmount, decimals) => {
    const tokenAta = await getAssociatedTokenAddress(mint, targetWallet);

    let txs = [
        createAssociatedTokenAccountInstruction(
            mintAuthority,
            tokenAta,
            targetWallet,
            mint
        ),
        createMintToInstruction(
            mint,
            tokenAta,
            mintAuthority,
            mintAmount * BigInt(10 ** decimals)
        )
    ];

    return txs;
};

const createMetadata = async (
    wallet,
    mint,
    name,
    symbol,
    description,
    imgFile,
    websiteLink,
    twitterLink,
    tgLink,
    mintAuthority,
    updateAuthority
) => {
    const metadata = {
        name,
        symbol,
        description,
        website: websiteLink || '',
        twitter: twitterLink || '',
        telegram: tgLink || ''
    };

    const formData = new FormData();
    formData.append('logo', imgFile);
    formData.append('metadata', JSON.stringify(metadata));

    let imageUrl, metadataUri;

    // Upload metadata and get URLs
    await fetch(`${BACKEND_URL}/api` + '/token/upload_metadata', {
        method: 'POST',
        body: formData
    }).then(async res => {
        let datas = await res.json();
        imageUrl = datas.imageUrl;
        metadataUri = datas.metadataUri;
    });

    if (!imageUrl || !metadataUri) {
        throw new Error("Failed to upload metadata!");
    }

    const [metadataPDA] = await PublicKey.findProgramAddress(
        [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mint.toBuffer()
        ],
        PROGRAM_ID
    );

    // On-chain metadata format
    const tokenMetadata = {
        name,
        symbol,
        uri: metadataUri,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    };

    // Transaction to create metadata account
    const tx = createCreateMetadataAccountV3Instruction({
        metadata: metadataPDA,
        mint,
        mintAuthority,
        payer: wallet.publicKey,
        updateAuthority
    }, {
        createMetadataAccountArgsV3: {
            data: tokenMetadata,
            isMutable: true,
            collectionDetails: null
        }
    });

    return { imageUrl, tx };
};

const revokeMintAuthority = async (mint, mintAuthority) => {
    const tx = createSetAuthorityInstruction(
        mint,
        mintAuthority,
        AuthorityType.MintTokens,
        null
    );

    return tx;
};

export const createToken = async (
    wallet,
    name,
    ticker,
    description,
    category,
    imgFile,
    websiteLink,
    twitterLink,
    tgLink
) => {
    try {
        let createTxs = [];

        /* Step 1 - Create mint (freezeAuthority disabled) */
        const { keypair: mintKeypair, txs: createMintTxs } = await createMint(wallet.publicKey, null, TOKEN_DECIMALS, category);
        createTxs = createMintTxs;

        /* Step 2 - Create metadata */
        const { imageUrl, tx: metadataTx } = await createMetadata(wallet, mintKeypair.publicKey, name, ticker, description, imgFile, websiteLink, twitterLink, tgLink, wallet.publicKey, wallet.publicKey);
        createTxs.push(metadataTx);

        /* Step 3 - Mint 80% tokens to owner */
        const mintTx1 = await mintToken(
            mintKeypair.publicKey,
            wallet.publicKey,
            wallet.publicKey,
            (BigInt(TOKEN_TOTAL_SUPPLY) * 8n) / 10n,
            TOKEN_DECIMALS
        );
        createTxs = [...createTxs, ...mintTx1];

        /* Step 4 - Mint 20% tokens to treasury */
        const mintTx2 = await mintToken(
            mintKeypair.publicKey,
            wallet.publicKey,
            TREASURY_WALLET,
            (BigInt(TOKEN_TOTAL_SUPPLY) * 2n) / 10n,
            TOKEN_DECIMALS
        );
        createTxs = [...createTxs, ...mintTx2];

        /* Step 5 - Revoke mintAuthority */
        const revokeTx = await revokeMintAuthority(
            mintKeypair.publicKey,
            wallet.publicKey
        );
        createTxs.push(revokeTx);

        return {
            mintKeypair,
            imageUrl,
            createTxs,
            mintAddress: mintKeypair.publicKey.toBase58()
        };
    } catch (err) {
        console.error(`Failed to create token: ${err.message}`);
        throw new Error(`Failed to create token: ${err.message}`);
    }
};

export const sendTx = async (wallet, transaction) => {
    if (wallet.publicKey === null || wallet.signTransaction === undefined)
        throw new Error("Invalid wallet!");

    const getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        }

        window.open('https://phantom.app/', '_blank');
    };

    try {
        const provider = getProvider();
        transaction.feePayer = wallet.publicKey;
        if (provider) {
            const { signature: txHash } = await provider.signAndSendTransaction(transaction);
            return txHash;
        }

        const signedTx = await wallet.signTransaction(transaction);
        const rawTx = signedTx.serialize();

        const txHash = await connection.sendRawTransaction(rawTx, {
            maxRetries: 0
        });
        return txHash;
    } catch (err) {
        console.error('sendTransaction error:', err);
        throw new Error(err.message);
    }
};

// Helper function to send transaction using VersionedTransaction
export const sendTransaction = async (wallet, transaction) => {
    if (!transaction.recentBlockhash) {
        const blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        transaction.recentBlockhash = blockhash;
    }
    try {
        const txHash = await sendTx(wallet, transaction);
        if (txHash === null) {
            throw new Error('Transaction failed to send');
        }
        let res = await connection.confirmTransaction(txHash);
        if (res.value.err) {
            throw new Error(`Transaction failed: ${res.value.err}`);
        }
        return txHash;
    }
    catch (err) {
        console.error('Transaction send/confirm error:', err);
        throw new Error(err.message);
    }
};

// Simple token creation without pool (original functionality)
export const executeTokenCreation = async (wallet, createTxs, mintKeypair) => {
    try {

        const transaction = new Transaction();
        createTxs.forEach(tx => transaction.add(tx));

        // Get recent blockhash
        const { blockhash } = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey;

        // Sign transaction with both wallet and mint keypair
        const signedTx = await wallet.signTransaction(transaction);
        signedTx.partialSign(mintKeypair);

        // Send transaction
        const txHash = await connection.sendRawTransaction(signedTx.serialize(), {
            skipPreflight: false,
            preflightCommitment: 'processed'
        });

        // Confirm transaction
        const confirmation = await connection.confirmTransaction({
            signature: txHash,
            blockhash: blockhash,
            lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
        });

        if (confirmation.value.err) {
            throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }

        return txHash;
    } catch (error) {
        console.error('Error executing token creation:', error);
        throw error;
    }
};