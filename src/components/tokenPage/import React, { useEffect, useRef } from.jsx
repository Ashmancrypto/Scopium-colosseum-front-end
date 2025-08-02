import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import Datafeed from './datafeed.js';

const TokenChart = ({ token }) => {
  const chartRef = useRef(null);
  const { isDark } = useTheme();
  const tvSymbol = token?.ticker?.toUpperCase() || 'SOL';
  const tokenId = token?.mintAddr;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('token price feed', tokenId, Datafeed(tokenId));

  useEffect(() => {
    if (!window.TradingView || !tokenId) return;

    const widget = new window.TradingView.widget({
      container_id: 'tv_chart_container',
      symbol: tvSymbol,
      interval: '15',
      width: '100%',
      height: 400,
      timezone: timezone,
      theme: isDark ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      datafeed: Datafeed(tokenId),
      library_path: '/charting_library/',
      disabled_features: ['header_symbol_search', 'header_compare'],
      enabled_features: ['study_templates'],
      // overrides: {
      //   'paneProperties.background': isDark ? '#111827' : '#ffffff',
      //   'scalesProperties.textColor': isDark ? '#d1d5db' : '#374151',
      // },
    });

    return () => {
      if (widget) widget.remove();
    };
  }, [tvSymbol, tokenId, isDark]);

  return (
    <div id="tv_chart_container" ref={chartRef} className="rounded border" />
  );
};

export default TokenChart;
