import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import Datafeed from './datafeed.js';

const TokenChart = ({ token }) => {
  const chartRef = useRef(null);
  const { isDark } = useTheme();
  const tvSymbol = `${token?.ticker || 'SOL'}/SOL`;
  const tokenId = token?.mintAddr;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('token price feed', tokenId, Datafeed(tokenId));

  useEffect(() => {
    if (!window.TradingView || !tokenId) return;

    const widget = new window.TradingView.widget({
      container_id: 'tv_chart_container',
      symbol: tvSymbol,
      interval: '15',
      fullscreen: false,
      width: '100%',
      height: 400,
      timezone: timezone,
      theme: isDark ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      datafeed: Datafeed(tokenId),
      library_path: '/charting_library/',
      toolbar_bg: '#0b1217',
      disabled_features: ['header_symbol_search', 'header_compare'],
      enabled_features: ['study_templates'],
      overrides: {
          'paneProperties.rightMargin': 0,
          'paneProperties.background': '#0b1217',
          'paneProperties.backgroundType': 'solid',
          'paneProperties.backgroundGradientEndColor': '#0b1217',
          'paneProperties.backgroundGradientStartColor': '#0b1217',
          'paneProperties.vertGridProperties.color': '#E3E3E5', // Grid Vertical Lines Color
          'paneProperties.horzGridProperties.color': '#E3E3E5', // Grid Horizontal Lines Color
          'mainSeriesProperties.candleStyle.upColor': '#11CC9A', // Up Candle Color
          'mainSeriesProperties.candleStyle.downColor': '#E20E7C', // Down Candle Color
          'mainSeriesProperties.candleStyle.borderUpColor': '#11CC9A', // Up Candle Border Color
          'mainSeriesProperties.candleStyle.borderDownColor': '#E20E7C', // Down Candle Border Color
          'mainSeriesProperties.candleStyle.drawBorder': false, // Disable candle borders
          'mainSeriesProperties.minTick': '100000000,1,false',
          "scalesProperties.textSize": 18,
          "scalesProperties.showLeftScale": false,
        },
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
