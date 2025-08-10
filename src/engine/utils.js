
import {
    TOKEN_PROGRAM_ID,
    SPL_ACCOUNT_LAYOUT
} from '@raydium-io/raydium-sdk';


export async function getWalletTokenAccounts(connection, wallet) {
    const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
        programId: TOKEN_PROGRAM_ID
    });
    return walletTokenAccount.value.map((i) => ({
        pubkey: i.pubkey,
        programId: i.account.owner,
        accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
    }));
};

export const sendTransaction = async (connection, walletCtx, transaction) => {
    if (walletCtx.publicKey === null || walletCtx.signTransaction === undefined)
        throw new Error("Invalid wallet!");

    try {
        transaction.feePayer = walletCtx.publicKey;
        const signedTx = await walletCtx.signTransaction(transaction);
        const rawTx = signedTx.serialize();

        // console.log('Sending transaction...');
        const txHash = await connection.sendRawTransaction(rawTx, {
            maxRetries: 0
        });
        return txHash;
    } catch (err) {
        console.error('sendTransaction err:', err);
        throw new Error(err.message);
    }
};

export const send = async (connection, walletCtx, transaction) => {
    if (!transaction.recentBlockhash) {
        const blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        transaction.recentBlockhash = blockhash;
    }

    try {
        const txHash = await sendTransaction(connection, walletCtx, transaction);
        if (txHash === null) {
            console.error('Transaction failed');
            return;
        }

        // console.log('Confirming transaction...');
        let res = await connection.confirmTransaction(txHash);
        if (res.value.err)
            console.error('Transaction failed');
        else
            console.log('Transaction confirmed');
        return txHash;
    } catch (err) {
        console.error('send err:', err);
        throw new Error(err.message);
    }
};

//   Example
//   const price = 2.8e-8;
//   console.log(formatSmallNumber(price));  // "0.(6)28"
export function formatSmallNumber(num) {
    if (num >= 1 || num <= -1) return num.toString(); // normal number

    const numStr = num.toExponential(); // "2.8e-8"
    const [mantissa, exponentPart] = numStr.split('e');
    const exponent = Math.abs(parseInt(exponentPart, 10));

    const zeros = exponent - 1; // because mantissa already includes one digit before point
    const mantissaDigits = mantissa.replace('.', '');

    return `0.(${zeros})${mantissaDigits}`;
}


//   Example
//   const price = 2.8e-4;
//   console.log(formatPriceWithSubscript(price));  // "0.0₄28"
const subscriptNumbers = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉'
};

function toSubscript(num) {
    return num.toString().split('').map(d => subscriptNumbers[d] || d).join('');
}

// export function formatPriceWithSubscript(num) {
//     if (num === 0) return 0;
//     if (num > 1 || num < -1) return parseFloat(num.toString())
//     const str = num.toFixed(20); // 20 digits precision
//     const match = str.match(/^0\.0*(\d+)/);

//     if (match) {
//         const zeros = str.indexOf(match[1]) - 2;  // count zeros
//         let digits = match[1];

//         // 🧹 Remove trailing zeros!
//         digits = digits.replace(/0+$/, '');
//         // console.log('debug digits::', digits)
//         return `0.0${toSubscript(zeros)}${digits.slice(0, Math.min(3, digits.length))}`;
//     }

//     return num.toString();
// }

export function formatCapNumber(number) {
    if (number >= 1000000) {
        return (Math.floor(number / 1000000)).toLocaleString() + 'M';
    } else if (number >= 1000) {
        return (Math.floor(number / 1000)).toLocaleString() + 'K';
    } else {
        return number.toString();
    }
}
