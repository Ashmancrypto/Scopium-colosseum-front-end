import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NetworkSidebar = ({ className = 'w-64' }) => {
  const [prices, setPrices] = useState({});
  const [latestPrices, setLatestPrices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              ids: 'bitcoin,ethereum,solana',
              sparkline: true
            }
          }
        );

        const newPrices = {};
        const currentPrices = {};
        res.data.forEach((coin) => {
          newPrices[coin.id] = coin.sparkline_in_7d.price;
          currentPrices[coin.id] = coin.current_price;
        });

        setPrices(newPrices);
        setLatestPrices(currentPrices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const cryptoCharts = [
    { id: 'bitcoin', symbol: 'BTC' },
    { id: 'ethereum', symbol: 'ETH' },
    { id: 'solana', symbol: 'SOL' }
  ];

  return (
    <div className={`${className} space-y-3`}>
      {cryptoCharts.map((crypto) => (
        <div
          key={crypto.id}
          className="w-full rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 bg-gray-900 border border-gray-700 hover:bg-gray-750 p-2 flex flex-col items-center"
        >
          <div className="text-xs text-gray-300 mb-1">{crypto.symbol}</div>

          {prices[crypto.id] ? (
            <>
              <div className="text-sm text-white font-semibold mb-2">
                ${latestPrices[crypto.id]?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
              <div className="flex items-end justify-center space-x-1 h-40 w-full">
                {prices[crypto.id].slice(-30).map((price, index, arr) => {
                  const prev = index > 0 ? arr[index - 1] : price;
                  const isUp = price >= prev;

                  const max = Math.max(...arr);
                  const min = Math.min(...arr);
                  const normalizedHeight =
                    max === min ? 50 : ((price - min) / (max - min)) * 100;
                  const height = Math.max(10, normalizedHeight);

                  return (
                    <div
                      key={index}
                      className="w-1.5 rounded transition-all duration-200"
                      style={{
                        height: `${height}%`,
                        backgroundColor: isUp ? '#10B981' : '#EF4444'
                      }}
                      title={`$${price.toFixed(2)}`}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-xs">Loading...</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NetworkSidebar;
