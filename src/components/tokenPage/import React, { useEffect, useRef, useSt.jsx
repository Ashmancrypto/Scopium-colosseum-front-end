import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import datafeed from './datafeed.js';

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
  2: ['Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Budapest', 'Europe/Copenhagen', 'Africa/Johannesburg', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Oslo', 'Europe/Paris', 'Europe/Rome', 'Europe/Stockholm', 'Europe/Warsaw', 'Europe/Zurich'],
  3: ['Asia/Bahrain', 'Europe/Athens', 'Europe/Bucharest', 'Africa/Cairo', 'Europe/Helsinki', 'Europe/Istanbul', 'Asia/Jerusalem', 'Asia/Kuwait', 'Europe/Moscow', 'Asia/Nicosia', 'Asia/Qatar', 'Europe/Riga'],
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

function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getOffsetFromTimezone(tz) {
  for (const [offset, zones] of Object.entries(TIMEZONE)) {
    if (zones.includes(tz)) return offset;
  }
  return null;
}

const TokenChart = ({ token }) => {
  const { isDark } = useTheme();
  const chartRef = useRef(null);

  const tvSymbol = `${token?.ticker || 'SOL'}/SOL`;

  useEffect(() => {
    // Remove any existing widget before creating a new one
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
    }

    console.log('Loading TradingView widget for symbol:', datafeed(token.mintAddr));

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.TradingView) {
        // @ts-ignore
        new window.TradingView.widget({
          container_id: 'tv_chart_container',
          datafeed: datafeed(token.mintAddr),
          width: '100%',
          height: 400,
          symbol: tvSymbol.replace('/', ''),
          time_frames: timeFrames,
          theme: isDark ? 'dark' : 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: isDark ? '#1f2937' : '#f9fafb',
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: false,
          enabled_features: [],
          disabled_features: ["header_compare"],
        });
      }
    };

    chartRef.current.appendChild(script);
  }, [tvSymbol, isDark]);

  return (
    <div className="space-y-4">
      <div
        id="tv_chart_container"
        ref={chartRef}
        className={`rounded-lg border overflow-hidden ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}
      ></div>
    </div>
  );
};

export default TokenChart;
