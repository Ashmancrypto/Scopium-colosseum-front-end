import React, { useContext, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { ExternalLink, Filter, ChevronDown, RefreshCw } from 'lucide-react';
import { formatTimeAgo, formatAddress } from '../../utils/formatters.js';
import { solPriceContext } from '../../contexts/SolPriceContext.jsx';
import { isMainNet } from '../../config/configSolana/index.js';
import { MAX_TXN_COL } from '../../contexts/contractsOnSolana/contracts/constants.js';

const TransactionTable = ({ transactions, loading, onRefresh }) => {
  const { isDark } = useTheme();
  const [sortBy, setSortBy] = useState('Most Recent');
  const [transactionFee, setTransactionFee] = useState('All');
  const [amountFilter, setAmountFilter] = useState('All');
  const [transactionType, setTransactionType] = useState('All');
  const [timeRange, setTimeRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { solPrice } = useContext(solPriceContext);
  const [currentPage, setCurrentPage] = useState(0);

  // Mock transaction data if none provided
  const mockTransactions = [
    {
      id: 1,
      user: 'USERNAME',
      sol: '0.3043',
      price: '$1.0216',
      maker: 'WACWVa',
      timestamp: Date.now() - 3240000, // 54 minutes ago
      type: 'buy'
    },
    {
      id: 2,
      user: 'USERNAME',
      sol: '0.3043',
      price: '$1.0216',
      maker: 'WACWVa',
      timestamp: Date.now() - 3240000,
      type: 'buy'
    },
    {
      id: 3,
      user: 'USERNAME',
      sol: '0.3043',
      price: '$1.0216',
      maker: 'WACWVa',
      timestamp: Date.now() - 3240000,
      type: 'sell'
    },
    {
      id: 4,
      user: 'USERNAME',
      sol: '0.3043',
      price: '$1.0216',
      maker: 'WACWVa',
      timestamp: Date.now() - 3240000,
      type: 'buy'
    }
  ];

  // const displayTransactions = transactions.length > 0 ? transactions : mockTransactions;
  const displayTransactions = transactions;
  const FilterDropdown = ({ label, value, onChange, options }) => (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center space-x-1 px-3 py-1 text-xs border rounded transition-colors ${isDark
          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
      >
        <span>{label}: {value}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  );

  const handleFirst = () => {
    setCurrentPage(0);
  }

  const handleLast = () => {
    setCurrentPage(Math.floor(transactions.length / MAX_TXN_COL));
  }

  const handlePrev = () => {
    if (currentPage >= 1)
      setCurrentPage((c) => c - 1)
  }

  const handleNext = () => {
    if (currentPage < Math.floor(transactions.length / MAX_TXN_COL)) {
      setCurrentPage((c) => c + 1)
    }
  }

  return (
    <div className={`rounded-xl border transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Transactions
        </h3>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`p-1 rounded transition-colors ${loading
              ? 'opacity-50 cursor-not-allowed'
              : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-4 border-b flex flex-wrap gap-2 ${isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
        <FilterDropdown label="Sort By" value={sortBy} />
        {/* <FilterDropdown label="Transaction Fee" value={transactionFee} /> */}
        <FilterDropdown label="Amount Filter" value={amountFilter} />
        <FilterDropdown label="Transaction Type" value={transactionType} />
        <FilterDropdown label="Time Range" value={timeRange} />
        <button className={`px-3 py-1 text-xs border rounded transition-colors ${isDark
          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              <th className="text-left p-3">USER</th>
              <th className="text-left p-3 hidden xs:flex">TYPE</th>
              <th className="text-left p-3">SOL</th>
              <th className="text-left p-3">PRICE</th>
              {/* <th className="text-left p-3">MAKER</th> */}
              <th className="text-left p-3">TIMESTAMPS</th>
              <th className="text-left p-3">TXN</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-pink-400" />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Loading transactions...
                    </span>
                  </div>
                </td>
              </tr>
            ) : displayTransactions.length > 0 ? (
              displayTransactions
              .filter((_, index) => index > currentPage * MAX_TXN_COL && index < (currentPage + 1) * MAX_TXN_COL)
              .map((tx, index) => (
                <tr
                  key={tx.id || index}
                  className={`border-t transition-colors hover:bg-opacity-50 ${isDark
                    ? 'border-gray-700 hover:bg-gray-700'
                    : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  <td className="p-3">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                      {/* {tx.walletAddr.slice(0, 5) || 'USERNAME'} */}
                    </span>
                  </td>
                  <td className="p-3 hidden xs:flex">
                    <span className={`text-sm ${tx.isBuy ? 'text-green-400' : 'text-red-400'} font-medium`}>
                      {tx.isBuy ? 'BUY' : "SELL"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm ${tx.isBuy ? 'text-green-400' : 'text-red-400'} font-medium`}>
                      {Number(tx.quoteAmount.toFixed(4)) || '0'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${(tx.quoteAmount * (solPrice || 200)).toFixed(2)}
                    </span>
                  </td>
                  {/* <td className="p-3">
                    <span className="text-sm text-red-400 font-medium">
                      ${tx.maker || 'WACWVa'}
                    </span>
                  </td> */}
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatTimeAgo(tx.date)}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <button className={`p-1 rounded transition-colors ${isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}>
                      <a href={isMainNet ? `https://solscan.io/tx/${tx.txhash}` : `https://solscan.io/tx/${tx.txhash}?cluster=devnet`} target="_blank">
                        <ExternalLink className="w-4 h-4" />

                      </a>

                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    No transactions found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Navigation */}
      <div className='p-4'>
        <div className='flex gap-2 flex-row items-center justify-end flex-wrap'>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:bg-neutral1 h-[32px] w-[32px] p-0'
            onClick={() => handleFirst()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-first" aria-hidden="true"><path d="m17 18-6-6 6-6"></path><path d="M7 6v12"></path></svg>
          </button>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:bg-neutral1 h-[32px] w-[32px] p-0'
            onClick={() => handlePrev()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          <div class="not-italic font-normal text-neutral7 text-[14px] leading-[24px]">Page {currentPage + 1} of {Math.floor(transactions.length / MAX_TXN_COL) + 1}</div>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:bg-neutral1 h-[32px] w-[32px] p-0"
            onClick={() => handleNext()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" aria-hidden="true">
              <path d="m9 18 6-6-6-6">
              </path>
            </svg>
          </button>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:bg-neutral1 h-[32px] w-[32px] p-0"
            onClick={() => handleLast()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last" aria-hidden="true">
              <path d="m7 18 6-6-6-6"></path><
                path d="M17 6v12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;