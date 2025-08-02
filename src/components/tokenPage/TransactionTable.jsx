import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { ExternalLink, Filter, ChevronDown, RefreshCw } from 'lucide-react';
import { formatTimeAgo, formatAddress } from '../../utils/formatters.js';

const TransactionTable = ({ transactions, loading, onRefresh }) => {
  const { isDark } = useTheme();
  const [sortBy, setSortBy] = useState('Most Recent');
  const [transactionFee, setTransactionFee] = useState('All');
  const [amountFilter, setAmountFilter] = useState('All');
  const [transactionType, setTransactionType] = useState('All');
  const [timeRange, setTimeRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

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

  const displayTransactions = transactions.length > 0 ? transactions : mockTransactions;

  const FilterDropdown = ({ label, value, onChange, options }) => (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center space-x-1 px-3 py-1 text-xs border rounded transition-colors ${
          isDark 
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>{label}: {value}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className={`rounded-xl border transition-colors duration-300 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Transactions
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`p-1 rounded transition-colors ${
              loading 
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
      <div className={`p-4 border-b flex flex-wrap gap-2 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <FilterDropdown label="Sort By" value={sortBy} />
        <FilterDropdown label="Transaction Fee" value={transactionFee} />
        <FilterDropdown label="Amount Filter" value={amountFilter} />
        <FilterDropdown label="Transaction Type" value={transactionType} />
        <FilterDropdown label="Time Range" value={timeRange} />
        <button className={`px-3 py-1 text-xs border rounded transition-colors ${
          isDark 
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
            <tr className={`text-xs font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <th className="text-left p-3">USER</th>
              <th className="text-left p-3">SOL</th>
              <th className="text-left p-3">PRICE</th>
              <th className="text-left p-3">MAKER</th>
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
              displayTransactions.map((tx, index) => (
                <tr 
                  key={tx.id || index}
                  className={`border-t transition-colors hover:bg-opacity-50 ${
                    isDark 
                      ? 'border-gray-700 hover:bg-gray-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <td className="p-3">
                    <span className={`text-sm font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tx.user || 'USERNAME'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm text-green-400 font-medium`}>
                      {tx.sol || '0.3043'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {tx.price || '$1.0216'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-red-400 font-medium">
                      {tx.maker || 'WACWVa'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatTimeAgo(tx.timestamp)}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <button className={`p-1 rounded transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      <ExternalLink className="w-4 h-4" />
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
    </div>
  );
};

export default TransactionTable;