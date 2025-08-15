import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { NATIVE_MINT } from '@solana/spl-token';
import { createToken, executeTokenCreation, sendTransaction } from './solana/index.js';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { useContract } from '../../contexts/contractsOnSolana/contractContexts.jsx';
import { TOKEN_TOTAL_SUPPLY } from '../../contexts/contractsOnSolana/contracts/constants.js';
import { updateToken } from '../../api/token/index.js';
import { addLookupTableInfo, connection } from '../../config/configSolana/index.js';
import { TransactionMessage, VersionedTransaction } from '@solana/web3.js';

export const useTokenCreationSolana = () => {
    const wallet = useWallet();
    const navigate = useNavigate();
    const toast = useToastContext();
    const { 
        isContractInitialized,
        getCreatePoolTx,
        getBuyTx
    } = useContract();
    const [isCreating, setIsCreating] = useState(false);

    const createNewToken = async (tokenData) => {
        if (!wallet.connected || !wallet.publicKey) {
            toast.error('Wallet Not Connected', 'Please connect your wallet to create a token.');
            return null;
        }

        setIsCreating(true);
        let pendingToastId = null;
        let txPendingToastId = null;
        let backendUpdateToastId = null;

        try {
            // Check if contract is initialized
            const isInitialized = await isContractInitialized();
            if (!isInitialized) {
                toast.error('Contract Not Initialized', 'The contract needs to be initialized before creating tokens.');
                return { success: false, error: 'Contract not initialized' };
            }

            // Show pending toast
            pendingToastId = toast.info(
                'Creating Token', 
                'Preparing token creation transaction...'
            );

            const {
                coinName,
                ticker,
                description,
                category,
                socialLinks,
                coinImage,
                bannerImage,
                firstBuyAmount
            } = tokenData;

            // Create token instructions
            const { mintKeypair, imageUrl, bannerUrl, createTxs: allTxs, mintAddress } = await createToken(
                wallet,
                coinName,
                ticker,
                description || '',
                category,
                coinImage.file,
                bannerImage.file,
                socialLinks.website || '',
                socialLinks.twitter || '',
                socialLinks.telegram || ''
            );

            // Get pool creation transaction
            const poolCreationTx = await getCreatePoolTx(
                mintKeypair.publicKey.toBase58(), 
                NATIVE_MINT
            );
            allTxs.push(poolCreationTx);

            // Get first buy transaction if amount is specified
            let firstBuyTx = null;
            if (firstBuyAmount && parseFloat(firstBuyAmount) > 0) {
                firstBuyTx = await getBuyTx(
                    mintKeypair.publicKey.toBase58(), 
                    parseFloat(firstBuyAmount)
                );
                allTxs.push(firstBuyTx);
            }

            // Remove pending toast
            if (pendingToastId) {
                toast.removeToast(pendingToastId);
                pendingToastId = null;
            }

            // Show transaction pending toast
            txPendingToastId = toast.info(
                'Transaction Pending',
                'Please confirm the transaction in your wallet...',
                { duration: null } // Don't auto-dismiss
            );

            // Execute the complete transaction (token + pool + optional buy)
            const blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
            const message = new TransactionMessage({
                payerKey: wallet.publicKey,
                instructions: allTxs,
                recentBlockhash: blockhash
            }).compileToV0Message(Object.values({ ...(addLookupTableInfo ?? {}) }));
            const transaction = new VersionedTransaction(message);
            transaction.sign([mintKeypair]);
            
            const txHash = await sendTransaction(wallet, transaction);

            // Remove transaction pending toast
            if (txPendingToastId) {
                toast.removeToast(txPendingToastId);
                txPendingToastId = null;
            }

            // Show backend update pending toast
            backendUpdateToastId = toast.info(
                'Updating Database',
                'Saving token information to database...',
                { duration: null }
            );

            // Update token metadata in backend with enhanced error handling
            try {
                const backendData = {
                    name: coinName,
                    ticker: ticker,
                    description: description || '',
                    logo: imageUrl,
                    banner: bannerUrl,
                    twitter: socialLinks.twitter || '',
                    telegram: socialLinks.telegram || '',
                    website: socialLinks.website || '',
                    mintAddr: mintKeypair.publicKey.toBase58(),
                    category: category
                };

                const result = await updateToken(
                    backendData.name,
                    backendData.ticker,
                    backendData.description,
                    backendData.logo,
                    backendData.banner,
                    backendData.twitter,
                    backendData.telegram,
                    backendData.website,
                    backendData.mintAddr,
                    backendData.category
                );

                // Remove backend update toast
                if (backendUpdateToastId) {
                    toast.removeToast(backendUpdateToastId);
                    backendUpdateToastId = null;
                }

                // Show final success toast with transaction hash
                toast.transactionSuccess(
                    'Token Created Successfully!',
                    `${coinName} (${ticker}) has been deployed to Solana with bonding curve and saved to database. Ready for trading!`,
                    txHash
                );
                navigate(`/token/${mintKeypair.publicKey.toBase58()}`);
            } catch (backendError) {
                console.error('Backend update failed:', backendError);
                
                // Remove backend update toast
                if (backendUpdateToastId) {
                    toast.removeToast(backendUpdateToastId);
                    backendUpdateToastId = null;
                }

                // Show warning toast - token was created but backend update failed
                toast.warning(
                    'Token Created, Database Update Failed',
                    `${coinName} (${ticker}) was successfully deployed but failed to save to database. The token is still functional.`,
                    { duration: 10000 }
                );
            }

            return {
                mintAddress,
                txHash,
                imageUrl,
                bannerUrl,
                poolCreated: !!poolCreationTx,
                firstBuyExecuted: !!firstBuyTx,
                success: true
            };

        } catch (error) {
            console.error('Token creation failed:', error);

            // Remove any pending toasts
            if (pendingToastId) {
                toast.removeToast(pendingToastId);
            }
            if (txPendingToastId) {
                toast.removeToast(txPendingToastId);
            }
            if (backendUpdateToastId) {
                toast.removeToast(backendUpdateToastId);
            }

            // Show error toast
            toast.error(
                'Token Creation Failed',
                error.message || 'An unexpected error occurred during token creation. Please try again.'
            );

            return {
                success: false,
                error: error.message
            };
        } finally {
            setIsCreating(false);
        }
    };

    // Alternative method for simple token creation without pool
    const createSimpleToken = async (tokenData) => {
        if (!wallet.connected || !wallet.publicKey) {
            toast.error('Wallet Not Connected', 'Please connect your wallet to create a token.');
            return null;
        }

        setIsCreating(true);
        let pendingToastId = null;
        let txPendingToastId = null;
        let backendUpdateToastId = null;

        try {
            pendingToastId = toast.info(
                'Creating Token', 
                'Preparing simple token creation...'
            );

            const {
                coinName,
                ticker,
                description,
                category,
                socialLinks,
                coinImage
            } = tokenData;

            const { mintKeypair, imageUrl, createTxs, mintAddress } = await createToken(
                wallet,
                coinName,
                ticker,
                description || '',
                category,
                coinImage.file,
                socialLinks.website || '',
                socialLinks.twitter || '',
                socialLinks.telegram || ''
            );

            if (pendingToastId) {
                toast.removeToast(pendingToastId);
                pendingToastId = null;
            }

            txPendingToastId = toast.info(
                'Transaction Pending',
                'Please confirm the transaction in your wallet...',
                { duration: null }
            );

            const txHash = await executeTokenCreation(wallet, createTxs, mintKeypair);

            if (txPendingToastId) {
                toast.removeToast(txPendingToastId);
                txPendingToastId = null;
            }

            // Show backend update pending toast
            backendUpdateToastId = toast.info(
                'Updating Database',
                'Saving token information to database...',
                { duration: null }
            );

            // Update token metadata in backend
            try {
                const result = await updateToken(
                    coinName,
                    ticker,
                    description || '',
                    imageUrl,
                    socialLinks.twitter || '',
                    socialLinks.telegram || '',
                    socialLinks.website || '',
                    mintKeypair.publicKey.toBase58(),
                    category
                );

                if (backendUpdateToastId) {
                    toast.removeToast(backendUpdateToastId);
                    backendUpdateToastId = null;
                }

                toast.transactionSuccess(
                    'Token Created Successfully!',
                    `${coinName} (${ticker}) has been deployed to Solana and saved to database.`,
                    txHash
                );

            } catch (backendError) {
                console.error('Backend update failed:', backendError);
                
                if (backendUpdateToastId) {
                    toast.removeToast(backendUpdateToastId);
                    backendUpdateToastId = null;
                }

                toast.warning(
                    'Token Created, Database Update Failed',
                    `${coinName} (${ticker}) was successfully deployed but failed to save to database.`,
                    { duration: 10000 }
                );
            }

            return {
                mintAddress,
                txHash,
                imageUrl,
                success: true
            };

        } catch (error) {
            console.error('Simple token creation failed:', error);

            if (pendingToastId) {
                toast.removeToast(pendingToastId);
            }
            if (txPendingToastId) {
                toast.removeToast(txPendingToastId);
            }
            if (backendUpdateToastId) {
                toast.removeToast(backendUpdateToastId);
            }

            toast.error(
                'Token Creation Failed',
                error.message || 'An unexpected error occurred during token creation.'
            );

            return {
                success: false,
                error: error.message
            };
        } finally {
            setIsCreating(false);
        }
    };

    return {
        createNewToken,
        createSimpleToken,
        isCreating
    };
};