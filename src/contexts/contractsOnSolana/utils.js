export const sendAndConfirmTransaction = async (connection, wallet, transaction) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
        throw new Error("Wallet not connected or doesn't support signing!");
    }

    try {
        // Set recent blockhash if not already set
        if (!transaction.recentBlockhash) {
            const { blockhash } = await connection.getLatestBlockhash("finalized");
            transaction.recentBlockhash = blockhash;
        }

        // Set fee payer and sign transaction
        transaction.feePayer = wallet.publicKey;
        const signedTx = await wallet.signTransaction(transaction);
        const rawTx = signedTx.serialize();

        // Send transaction
        console.log('Sending transaction...');
        const txHash = await connection.sendRawTransaction(rawTx, {
            skipPreflight: false,
            preflightCommitment: 'processed',
            maxRetries: 3
        });

        if (!txHash) {
            console.error('Transaction failed');
            throw new Error('Transaction failed to send');
        }

        // Confirm transaction
        console.log('Confirming transaction...');
        const confirmation = await connection.confirmTransaction({
            signature: txHash,
            blockhash: transaction.recentBlockhash,
            lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
        });
        
        if (confirmation.value.err) {
            console.error('Transaction failed:', confirmation.value.err);
            throw new Error(`Transaction failed: ${confirmation.value.err}`);
        } else {
            console.log('Transaction confirmed');
        }

        return txHash;
    } catch (err) {
        console.error('sendAndConfirmTransaction error:', err);
        throw new Error(err.message);
    }
};