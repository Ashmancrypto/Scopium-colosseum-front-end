import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import Datafeed from './DataFeed.js';

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
      height: 450,
      timezone: timezone,
      theme: 'dark',
      style: '1',
      locale: 'en',
      datafeed: Datafeed(tokenId),
      library_path: '/charting_library/',
      toolbar_bg: '#131722',
      disabled_features: ['header_symbol_search', 'header_compare', 'left_toolbar'],
      enabled_features: ['study_templates'],
      loading_screen: {
          backgroundColor: "transparent",
      },
      overrides: {
        'paneProperties.background': '#0b1326',
        'paneProperties.backgroundType': 'solid',
        'paneProperties.backgroundGradientEndColor': '#0b1326',
        'paneProperties.backgroundGradientStartColor': '#0b1326',
        'paneProperties.vertGridProperties.color': '#4a4a4a',
        'paneProperties.horzGridProperties.color': '#4a4a4a',
        'paneProperties.vertGridProperties.style': 1,
        'paneProperties.horzGridProperties.style': 1,
        'scalesProperties.textColor': '#b0b0b0',
        'scalesProperties.backgroundColor': '#0b1326',
        'mainSeriesProperties.candleStyle.upColor': '#11CC9A',
        'mainSeriesProperties.candleStyle.downColor': '#E20E7C',
        'mainSeriesProperties.candleStyle.borderUpColor': '#11CC9A',
        'mainSeriesProperties.candleStyle.borderDownColor': '#E20E7C',
        'mainSeriesProperties.candleStyle.drawBorder': false,
        'mainSeriesProperties.minTick': '100000000,1,false',
        'scalesProperties.textSize': 18,
        'scalesProperties.showLeftScale': false,
        'paneProperties.legendProperties.showBackground': false,
        'paneProperties.legendProperties.backgroundColor': '#0b1326',
        'timeScaleProperties.backgroundColor': '#0b1326',
        'mainSeriesProperties.priceLineColor': '#b0b0b0',
        'paneProperties.topMargin': 10,
        'paneProperties.bottomMargin': 10,
        'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0)',
      },
    });

    return () => {
      if (widget) widget.remove();
    };
  }, [tvSymbol, tokenId, timezone]);

  return (
    <div
      id="tv_chart_container"
      ref={chartRef}
      className="rounded tv-chart-container"
      style={{
        backgroundColor: '#0b1326',
        overflow: 'hidden'
      }}
    />
  );
};

export default TokenChart;
