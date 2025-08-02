
const Datafeed = (tokenId) => ({
  onReady: (cb) => {
    setTimeout(() => cb({
      supported_resolutions: ['1', '5', '15', '60', '120', '240', '1D', '1W'],
    }), 0);
  },

  resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
    onSymbolResolvedCallback({
      name: symbolName,
      ticker: symbolName,
      type: 'crypto',
      session: '24x7',
      timezone: 'Etc/UTC',
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: true,
      supported_resolutions: ['1', '5', '15', '60', '120', '240', '1D', '1W'],
    });
  },

  getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback) => {
    try {
      const res = await fetch(`/api/getFeedData?tokenId=${tokenId}&from=${from}&to=${to}&interval=${resolution}`);
      const data = await res.json();
      console.log('Fetched data:', data);

      const bars = data.map(d => ({
        time: d.time * 1000,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume || 0,
      }));

      onHistoryCallback(bars, { noData: bars.length === 0 });
    } catch (err) {
      console.error('Datafeed error:', err);
      onErrorCallback(err);
    }
  },

  subscribeBars: () => {},
  unsubscribeBars: () => {},
});

export default Datafeed;
