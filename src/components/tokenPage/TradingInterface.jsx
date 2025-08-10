import React, { useState, useContext } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Transaction, PublicKey } from '@solana/web3.js'
import { NATIVE_MINT } from '@solana/spl-token';
import {
  Token,
  TokenAmount,
  TOKEN_PROGRAM_ID
} from "@raydium-io/raydium-sdk";
import { solPriceContext } from '../../contexts/SolPriceContext.jsx';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import CustomWalletButton from '../CustomWalletButton.jsx';
import { useContract } from '../../contexts/contractsOnSolana/contractContexts.jsx';
import { getToken, getThreadData, reply, likeReply, dislikeReply, mentionReply, trade, getTradeHistory, getMarketId } from '../../api/token/index.js';
import { send } from '../../engine/utils.js'
import { swap } from '../../engine/swap.js'
import { connection } from '../../config/configSolana/index.js';
import { QUOTE_DECIMALS, TOKEN_DECIMALS, TRADING_FEE } from '../../contexts/contractsOnSolana/contracts/constants.js';

const TradingInterface = ({ token }) => {
  // console.log('debug trading interface::', token)
  const { isDark } = useTheme();
  const { connected } = useWallet();
  const walletCtx = useWallet();
  const { solPrice } = useContext(solPriceContext);
  const toast = useToastContext();
  const { isPoolCreated, getBuyTx, getSellTx, isPoolComplete, getReceivableOnBuy, getReceivableOnSell } = useContract();

  const [activeTab, setActiveTab] = useState('buy');
  const [orderType, setOrderType] = useState('instant');
  const [amount, setAmount] = useState('');
  const [outAmount, setOutAmount] = useState('');
  const [isTrading, setIsTrading] = useState(false);

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setAmount('')
    setOutAmount('')
  }
  const handleChangeOnBuy = async (_inputAmount) => {
    console.log('debug handle change::', _inputAmount)
    setAmount(_inputAmount);
    if (activeTab === 'buy') {
      if (_inputAmount > TRADING_FEE) {
        const quoteAmount = await getReceivableOnBuy(token.mintAddr, NATIVE_MINT, (_inputAmount - TRADING_FEE));
        console.log('debug quote amount::', quoteAmount, typeof quoteAmount, 10 ** TOKEN_DECIMALS)
        setOutAmount(quoteAmount / (10 ** TOKEN_DECIMALS));
      }
    } else {
      const baseAmount = await getReceivableOnSell(token.mintAddr, NATIVE_MINT, _inputAmount);
      if (baseAmount / (10 ** QUOTE_DECIMALS) > TRADING_FEE) {
        setOutAmount(baseAmount / (10 ** QUOTE_DECIMALS) - TRADING_FEE);
      }
    }
  }

  const handleTrade = async () => {
    if (!connected) {
      toast.warning('Wallet Not Connected', 'Please connect your wallet to trade.');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.warning('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    if (activeTab === "buy" && amount <= TRADING_FEE) {
      toast.warning('Invalid Amount', "Should be bigger than TRADING_FEE");
      return;
    }

    if (activeTab === "sell" && outAmount <= TRADING_FEE) {
      toast.warning('Invalid Amount', "Should be bigger than TRADING_FEE");
      return;
    }

    setIsTrading(true);
    try {
      const tokenMint = token.mintAddr;
      // TODO: Implement actual trading logic
      const isPoolCompleted2 = await isPoolComplete(tokenMint, NATIVE_MINT);
      if (isPoolCompleted2) {
        // swap on Raydium
        const id = toast.info(`Trading ${ticker}...`);

        try {
          let inputTokenAmount;
          let outputToken;

          if (isBuy) {
            inputTokenAmount = new TokenAmount(Token.WSOL, BigInt(Math.trunc(Number(amount) * LAMPORTS_PER_SOL)));
            outputToken = new Token(TOKEN_PROGRAM_ID, tokenMint, TOKEN_DECIMALS);
          } else {
            inputTokenAmount = new TokenAmount(
              new Token(TOKEN_PROGRAM_ID, tokenMint, TOKEN_DECIMALS),
              BigInt(Math.trunc(Number(amount) * 10 ** TOKEN_DECIMALS))
            );
            outputToken = Token.WSOL;
          }

          const marketId = await getMarketId(tokenMint, Token.WSOL.mint.toBase58());
          // console.log('marketId:', marketId);
          const txHashes = await swap(walletCtx, inputTokenAmount, outputToken, new PublicKey(marketId), isBuy);
          console.log('  trade txHashes:', txHashes);

          toast.dismiss(id);
          toast.success('Swap complete!');

          await trade(tokenMint, isBuy,
            isBuy ? 0 : Number(amount), // To do - cryptoprince
            isBuy ? Number(amount) : 0, // To do - cryptoprince
            txHashes[0],
            comment.current.value
          );

          setIsTrading(false);
        } catch (err) {
          console.error(err);
          toast.dismiss(id);
          toast.error(err.message);
        }

        return;
      }

      const created = await isPoolCreated(tokenMint, NATIVE_MINT);
      if (!created) {
        toast.error(`Pool not created for token '${tokenMint}'`);
        return;
      }

      const id = toast.info(`Trading ${token.ticker}...`);
      let isBuy = activeTab === "buy" ? true : false;
      try {
        let tx = null;

        if (isBuy) tx = new Transaction().add(await getBuyTx(tokenMint, Number(amount)));
        else tx = new Transaction().add(await getSellTx(tokenMint, Number(amount)));
        // console.log('tx:', tx);

        const txHash = await send(connection, walletCtx, tx);
        console.log('  trade txHash:', txHash);

        // toast.dismiss(id);
        toast.success('Trade complete!');

        await trade(
          tokenMint,
          isBuy,
          isBuy ? 0 : Number(amount), // To do - cryptoprince
          isBuy ? Number(amount) : 0, // To do - cryptoprince
          txHash,
          ""
          // comment.current.value
        );

        setIsTrading(false);
      } catch (err) {
        console.error(err);
        // toast.dismiss(id);
        toast.error(err.message);
      }

      // await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay

      // toast.success(
      //   `${activeTab === 'buy' ? 'Buy' : 'Sell'} Order Submitted`,
      //   `Your ${activeTab} order for ${amount} ${activeTab === 'buy' ? 'SOL' : token.ticker} has been submitted.`
      // );
    } catch (error) {
      toast.error('Trade Failed', error.message || 'Failed to execute trade.');
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <div className={`rounded-xl border transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
      {/* Buy/Sell Tabs */}
      <div className="flex">
        <button
          onClick={() => handleSwitchTab('buy')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'buy'
            ? 'bg-green-500 text-white'
            : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Buy
        </button>
        <button
          onClick={() => handleSwitchTab('sell')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'sell'
            ? 'bg-red-500 text-white'
            : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Sell
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Type */}
        <div className="flex space-x-2">
          <button
            onClick={() => setOrderType('instant')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${orderType === 'instant'
              ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
              : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Instant
          </button>
          <button
            onClick={() => setOrderType('trigger')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${orderType === 'trigger'
              ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
              : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Trigger
          </button>
          <button
            onClick={() => setOrderType('recurring')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${orderType === 'recurring'
              ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
              : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Recurring
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
            {/* {activeTab === 'buy' ? 'Selling' : 'Buying'} */}
            Selling
          </label>

          <div className={`flex items-center space-x-3 p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
            }`}>
            {activeTab === 'buy' ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SOL</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                {token?.logo ? (
                  <img src={token.logo} alt={token.ticker} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">
                    {token?.ticker?.charAt(0) || 'T'}
                  </span>
                )}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <input
                  className={`w-full text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  type="number"
                  value={amount}
                  // onChange={(e) => { setAmount(e.target.value) }}
                  onChange={(e) => handleChangeOnBuy(e.target.value)}
                />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  ${activeTab === 'buy' ? (amount * (solPrice || 200)).toFixed(2) : (outAmount * (solPrice || 200)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buying Amount */}
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
            {/* {activeTab === 'buy' ? 'Buying' : 'Selling'} */}
            Buying
          </label>

          <div className={`flex items-center space-x-3 p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
            }`}>
            {activeTab !== 'buy' ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SOL</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                {token?.logo ? (
                  <img src={token.logo} alt={token.ticker} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">
                    {token?.ticker?.charAt(0) || 'T'}
                  </span>
                )}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <input
                  className={`w-full text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  type="number"
                  disabled
                  value={outAmount}
                />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  ${activeTab === 'buy' ? (amount * (solPrice || 200)).toFixed(2) : (outAmount * (solPrice || 200)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Button */}
        {connected ? (
          <button
            onClick={handleTrade}
            disabled={isTrading}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'buy'
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isTrading ? 'Processing...' : `${activeTab === 'buy' ? 'Buy' : 'Sell'} Now`}
          </button>
        ) : (
          <CustomWalletButton className="w-full justify-center" />
        )}
      </div>
    </div>
  );
};

export default TradingInterface;