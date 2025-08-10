import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import * as anchor from '@project-serum/anchor';
import { PublicKey, 
    SystemProgram, 
    Transaction
} from '@solana/web3.js';
import { NATIVE_MINT, 
    TOKEN_PROGRAM_ID, 
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync
} from '@solana/spl-token';
import BN from 'bn.js';

import { PUMPFUN_PROGRAM_ID, QUOTE_DECIMALS, REAL_BASE_RESERVES, TOKEN_DECIMALS, VIRT_QUOTE_RESERVES } from './constants';
import { IDL } from '../../../constants/idl';
import * as Keys from './keys';
import { connection } from '../../../config/configSolana';
import { sendAndConfirmTransaction } from '../utils';


const getProgram = (wallet) => {
    const provider = new anchor.AnchorProvider(
        connection, 
        wallet, 
        anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(IDL, PUMPFUN_PROGRAM_ID, provider);
    return program;
};

export const getInitialOutputAmount = (input_amount) => {
    const outputAmount = REAL_BASE_RESERVES * input_amount / (input_amount + VIRT_QUOTE_RESERVES);
    return outputAmount
}


export const contract_getMainStateInfo = async (wallet) => {
    if (!wallet.connected) return null;

    const mainStateKey = await Keys.getMainStateKey();

    let mainStateInfo = await connection.getAccountInfo(mainStateKey);
    if (!mainStateInfo) return null;

    const program = getProgram(wallet);
    mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    return mainStateInfo;
};

export const contract_isInitialized = async (wallet) => {
    const mainStateInfo = await contract_getMainStateInfo(wallet);
    return mainStateInfo?.initialized;
};

export const contract_initMainState = async (wallet) => {
    if (!wallet.connected)
        throw new WalletNotConnectedError();

    const program = getProgram(wallet);
    const mainStateKey = await Keys.getMainStateKey();

    const tx = new Transaction().add(
        await program.methods
            .initMainState()
            .accounts({
                mainState: mainStateKey, 
                owner: wallet.publicKey, 
                systemProgram: SystemProgram.programId
            })
            .instruction()
    );

    const txHash = await sendAndConfirmTransaction(connection, wallet, tx);
    console.log('  initMainState txHash:', txHash);
};

export const contract_isPoolCreated = async (wallet, baseToken, quoteMint) => {
    if (!wallet.connected) return false;

    try {
        const baseMint = new PublicKey(baseToken);
        const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
        if (!poolStateKey) return false;

        const program = getProgram(wallet);
        const poolStateInfo = await program.account.poolState.fetch(poolStateKey);
        return poolStateInfo ? true : false;
    } catch (err) {
        console.error(err.message);
        return false;
    }
};

export const contract_createPoolTx = async (wallet, baseToken, quoteMint) => {
    if (!wallet.connected)
        throw new WalletNotConnectedError();

    const creator = wallet.publicKey;
    const program = getProgram(wallet);
    const mainStateKey = await Keys.getMainStateKey();
    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }

    const baseMint = new PublicKey(baseToken);
    if (!baseMint)
        throw new Error("Invalid token");

    const creatorBaseAta = getAssociatedTokenAddressSync(baseMint, creator);
    const creatorQuoteAta = getAssociatedTokenAddressSync(quoteMint, creator);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    const feeQuoteAta = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient);

    const tx = await program.methods
        .createPool()
        .accounts({
            creator, 
            mainState: mainStateKey,
            feeRecipient: mainStateInfo.feeRecipient, feeQuoteAta,  
            poolState: poolStateKey, 
            baseMint, quoteMint, 
            creatorBaseAta, creatorQuoteAta, 
            reserverBaseAta, reserverQuoteAta, 
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return tx;
};

export const contract_buyTx = async (wallet, baseToken, solAmount) => {
    if (!wallet.connected)
        throw new WalletNotConnectedError();

    const buyer = wallet.publicKey;
    const program = getProgram(wallet);
    const mainStateKey = await Keys.getMainStateKey();
    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }

    const baseMint = new PublicKey(baseToken);
    if (!baseMint) {
        throw new Error("Invalid token");
    }
    const quoteMint = new PublicKey(NATIVE_MINT);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    
    const quoteMintDecimals = 9;
    const balance = new BN(Math.floor(solAmount * (10 ** quoteMintDecimals)));
    const buyerBaseAta = getAssociatedTokenAddressSync(baseMint, buyer);
    const buyerQuoteAta = getAssociatedTokenAddressSync(quoteMint, buyer);
    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    const feeQuoteAta = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient);
    const ix = await program.methods
        .buy(balance)
        .accounts({
            baseMint, quoteMint, 
            buyer, buyerBaseAta, buyerQuoteAta, 
            mainState: mainStateKey, 
            poolState: poolStateKey, 
            feeRecipient: mainStateInfo.feeRecipient, feeQuoteAta, 
            reserverBaseAta, reserverQuoteAta, 
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_sellTx = async (wallet, baseToken, sellAmount) => {
    if (!wallet.connected)
        throw new WalletNotConnectedError();

    const seller = wallet.publicKey;
    const program = getProgram(wallet);
    const mainStateKey = await Keys.getMainStateKey();
    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }

    const baseMint = new PublicKey(baseToken);
    if (!baseMint) {
        throw new Error("Invalid token");
    }
    const quoteMint = new PublicKey(NATIVE_MINT);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    
    const baseMintDecimals = TOKEN_DECIMALS;
    const sellBalance = new BN(Math.floor(sellAmount * (10 ** baseMintDecimals)));
    const sellerBaseAta = getAssociatedTokenAddressSync(baseMint, seller);
    const sellerQuoteAta = getAssociatedTokenAddressSync(quoteMint, seller);
    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    const feeQuoteAta = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient);
    console.log('debug accounts::', mainStateKey.toBase58(), poolStateKey.toBase58(), 
        baseMint.toBase58(), quoteMint.toBase58(),
        seller.toBase58(), sellerBaseAta.toBase58(), sellerQuoteAta.toBase58(),
        reserverBaseAta.toBase58(), reserverQuoteAta.toBase58(),
        mainStateInfo.feeRecipient.toBase58(), feeQuoteAta.toBase58());
    const ix = await program.methods
        .sell(sellBalance)
        .accounts({
            mainState: mainStateKey, 
            poolState: poolStateKey, 
            baseMint, quoteMint,
            seller, sellerBaseAta, sellerQuoteAta, 
            reserverBaseAta, reserverQuoteAta, 
            feeRecipient: mainStateInfo.feeRecipient, feeQuoteAta, 
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_updateMainStateInfo = async (wallet, owner, feeRecipient, tradingFee, creatingFee) => {
    if (!wallet.connected) return false;

    let newOwner = null;
    let newFeeRecipient = null;
    let newTradingFee = null;
    let newCreatingFee = null;
    
    const ownerAddress = new PublicKey(owner);
    if (!ownerAddress) throw new Error('Invalid owner address!');
    newOwner = ownerAddress;
    
    const feeAddress = new PublicKey(feeRecipient);
    if (!feeAddress) throw new Error('Invalid fee recipient address!');
    newFeeRecipient = feeAddress;
    
    newTradingFee = new BN(tradingFee);
    newCreatingFee = new BN(creatingFee);

    const program = getProgram(wallet);
    const mainStateKey = await Keys.getMainStateKey();
    const tx = new Transaction().add(
        await program.methods.updateMainState({
            owner: newOwner, 
            feeRecipient: newFeeRecipient, 
            tradingFee: newTradingFee,
            creatingFee: newCreatingFee
        })
        .accounts({
            owner: wallet.publicKey, 
            mainState: mainStateKey
        })
        .instruction()
    );

    const txHash = await sendAndConfirmTransaction(connection, wallet, tx);
    console.log('  updateMainState txHash:', txHash);
};

export const contract_isPoolComplete = async (wallet, baseToken, quoteMint) => {
    if (!wallet.connected) return false;

    const baseMint = new PublicKey(baseToken);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);

    const program = getProgram(wallet);
    const poolStateInfo = await program.account.poolState.fetch(poolStateKey);
    if (!poolStateInfo) return false;

    return poolStateInfo?.complete;
};

export const contract_receivableAmountOnBuy = async (wallet, baseToken, quoteMint, inputAmount) => {
    console.log('debug inputAmount::', inputAmount)
    const baseMint = new PublicKey(baseToken);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    const program = getProgram(wallet);
    const poolStateInfo = await program.account.poolState.fetch(poolStateKey);
    if (!poolStateInfo) return;
    console.log('debug pool state info::', poolStateInfo.realBaseReserves.toString(), poolStateInfo.realQuoteReserves.toString(), poolStateInfo.virtBaseReserves.toString(), poolStateInfo.virtQuoteReserves.toString())
    const quoteReserves = poolStateInfo.realQuoteReserves.add(poolStateInfo.virtQuoteReserves);
    const baseReservers = poolStateInfo.realBaseReserves;
    const bnInputAmount = new BN(Math.floor(inputAmount * (10 ** QUOTE_DECIMALS)));
    console.log('debug bn input::', bnInputAmount.add(quoteReserves).toString())
    const quoteAmount = baseReservers * bnInputAmount / (bnInputAmount.add(quoteReserves))
    // console.log('debug pool state info::', typeof poolStateInfo.realBaseReserves, quoteReserves, quoteAmount, bnInputAmount.add(quoteReserves))
    return quoteAmount
}

export const contract_receivableAmountOnSell = async (wallet, baseToken, quoteMint, inputAmount) => {
    const baseMint = new PublicKey(baseToken);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    const program = getProgram(wallet);
    const poolStateInfo = await program.account.poolState.fetch(poolStateKey);
    if (!poolStateInfo) return;
    const quoteReserves = poolStateInfo.realQuoteReserves.add(poolStateInfo.virtQuoteReserves);
    const baseReservers = poolStateInfo.realBaseReserves;
    const bnInputAmount = new BN(Math.floor(inputAmount * (10 ** TOKEN_DECIMALS)));
    const quoteAmount = quoteReserves * bnInputAmount / (bnInputAmount.add(baseReservers))
    // console.log('debug pool state info::', typeof poolStateInfo.realBaseReserves, quoteReserves, quoteAmount, bnInputAmount.add(quoteReserves))
    return quoteAmount
}