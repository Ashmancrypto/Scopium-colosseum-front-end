import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import Datafeed from './DataFeed.js';


const timeFrames = [
  { text: "6m", resolution: "120" },
  { text: "3m", resolution: "60" },
  { text: "1m", resolution: "30" },
  {
    text: "5d",
    resolution: "D",
    description: "5 days",
  },
  {
    text: "1d",
    resolution: "D",
    description: "1 day",
  },
];


const TIMEZONE = {
  '-10': ['Pacific/Honolulu'],
  '-8': ['America/Anchorage', 'America/Juneau'],
  '-7': ['America/Los_Angeles', 'America/Phoenix', 'America/Vancouver'],
  '-6': ['America/Mexico_City'],
  '-5': ['America/Bogota', 'America/Chicago', 'America/Lima'],
  '-4': ['America/Caracas', 'America/New_York', 'America/Santiago', 'America/Toronto'],
  '-3': ['America/Argentina/Buenos_Aires', 'America/Sao_Paulo'],
  0: ['Atlantic/Reykjavik'],
  1: ['Africa/Casablanca', 'Africa/Lagos', 'Europe/London'],
  2: [
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Bratislava',
    'Europe/Brussels',
    'Europe/Budapest',
    'Europe/Copenhagen',
    'Africa/Johannesburg',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Oslo',
    'Europe/Paris',
    'Europe/Rome',
    'Europe/Stockholm',
    'Europe/Warsaw',
    'Europe/Zurich',
  ],
  3: [
    'Asia/Bahrain',
    'Europe/Athens',
    'Europe/Bucharest',
    'Africa/Cairo',
    'Europe/Helsinki',
    'Europe/Istanbul',
    'Asia/Jerusalem',
    'Asia/Kuwait',
    'Europe/Moscow',
    'Asia/Nicosia',
    'Asia/Qatar',
    'Europe/Riga',
  ],
  4: ['Asia/Dubai'],
  5: ['Asia/Karachi'],
  6: ['Asia/Almaty'],
  6.5: ['Asia/Yangon'],
  7: ['Asia/Bangkok'],
  8: ['Asia/Chongqing'],
  9: ['Asia/Tokyo'],
  9.5: ['Australia/Adelaide'],
  10: ['Australia/Brisbane'],
  11: ['Pacific/Norfolk'],
  12.75: ['Pacific/Chatham'],
};


const TokenChart = ({ token }) => {
  const chartRef = useRef(null);
  const { isDark } = useTheme();
  const tvSymbol = `${token?.ticker || 'SOL'}/SOL`;
  const tokenId = token?.mintAddr;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = (-1 * new Date().getTimezoneOffset()) / 60;
  // console.log('token price feed', tokenId, Datafeed(tokenId));
  const chartHeight = 600
  useEffect(() => {
    if (!window.TradingView || !tokenId) return;
    //============= Not working
    // const widget = new window.TradingView.widget({
    //   container_id: 'tv_chart_container',
    //   symbol: tvSymbol,
    //   interval: '15',
    //   fullscreen: false,
    //   width: '100%',
    //   height: 450,
    //   timezone: timezone,
    //   theme: 'dark',
    //   style: '1',
    //   locale: 'en',
    //   datafeed: Datafeed(tokenId),
    //   library_path: '/charting_library/',
    //   toolbar_bg: '#131722',
    //   disabled_features: ['header_symbol_search', 'header_compare', 'left_toolbar'],
    //   enabled_features: ['study_templates'],
    //   loading_screen: {
    //       backgroundColor: "transparent",
    //   },
    //   overrides: {
    //     'paneProperties.background': '#0b1326',
    //     'paneProperties.backgroundType': 'solid',
    //     'paneProperties.backgroundGradientEndColor': '#0b1326',
    //     'paneProperties.backgroundGradientStartColor': '#0b1326',
    //     'paneProperties.vertGridProperties.color': '#4a4a4a',
    //     'paneProperties.horzGridProperties.color': '#4a4a4a',
    //     'paneProperties.vertGridProperties.style': 1,
    //     'paneProperties.horzGridProperties.style': 1,
    //     'scalesProperties.textColor': '#b0b0b0',
    //     'scalesProperties.backgroundColor': '#0b1326',
    //     'mainSeriesProperties.candleStyle.upColor': '#11CC9A',
    //     'mainSeriesProperties.candleStyle.downColor': '#E20E7C',
    //     'mainSeriesProperties.candleStyle.borderUpColor': '#11CC9A',
    //     'mainSeriesProperties.candleStyle.borderDownColor': '#E20E7C',
    //     'mainSeriesProperties.candleStyle.drawBorder': false,
    //     'mainSeriesProperties.minTick': '100000000,1,false',
    //     'scalesProperties.textSize': 18,
    //     'scalesProperties.showLeftScale': false,
    //     'paneProperties.legendProperties.showBackground': false,
    //     'paneProperties.legendProperties.backgroundColor': '#0b1326',
    //     'timeScaleProperties.backgroundColor': '#0b1326',
    //     'mainSeriesProperties.priceLineColor': '#b0b0b0',
    //     'paneProperties.topMargin': 10,
    //     'paneProperties.bottomMargin': 10,
    //     'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0)',
    //   },
    // });
    // return () => {
    //   if (widget) widget.remove();
    // };

    const widget = (window.tvWidget = new TradingView.widget({
      symbol: tvSymbol,
      interval: '15',
      fullscreen: false,
      width: "100%",
      height: "100%",
      container_id: 'tv_chart_container',
      datafeed: Datafeed(tokenId),
      library_path: '/charting_library/',
      toolbar_bg: '#0b1217',
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
      disabled_features: ['header_symbol_search'],
      time_frames: timeFrames,
      theme: 'Dark',
      timezone: TIMEZONE[offset][0],
    }));

    widget.onChartReady(async () => {
      widget.activeChart().setTimezone('UTC');
    });

  }, [tvSymbol, tokenId, timezone]);

  return (
    // <div
    //   id="tv_chart_container"
    //   ref={chartRef}
    //   className="rounded tv-chart-container"
    //   style={{
    //     backgroundColor: '#0b1326',
    //     overflow: 'hidden'
    //   }}
    // />
    <div id="tv_chart_container"
      ref={chartRef}
      className="rounded tv-chart-container"
      style={{ height: chartHeight, backgroundColor: 'black' }}
    />
  );
};

export default TokenChart;
