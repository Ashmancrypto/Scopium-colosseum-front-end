import React, { useRef, useEffect } from "react";
import { createChart, LineSeries } from "lightweight-charts";

const TokenChart = ({
  token = {
    priceHistory: [
      { price: 0, timestamp: "2024-02-09T11:01:00.000Z" },
      { price: 500, timestamp: "2024-03-08T11:01:00.000Z" },
      { price: 3000, timestamp: "2024-04-07T11:01:00.000Z" },
      { price: -2000, timestamp: "2024-05-06T11:01:00.000Z" },
      { price: 1500, timestamp: "2024-06-05T11:01:00.000Z" },
      { price: 2000, timestamp: "2024-07-04T11:01:00.000Z" },
      { price: 2500, timestamp: "2024-08-03T11:01:00.000Z" },
      { price: -3000, timestamp: "2024-09-02T11:01:00.000Z" },
    ],
  },
}) => {
  const mappedPriceHistory = token.priceHistory.map((price) => ({
    time: price.timestamp.slice(0, 10),
    value: price.price,
  }));

  const chartContainerRef = useRef();
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight || 250,
      layout: {
        background: { type: "solid", color: "#0f1e25" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#334158" },
        horzLines: { color: "#334158" },
      },
      timeScale: {
        borderColor: "#485c7b",
      },
      rightPriceScale: { borderColor: "#485c7b" },
      leftPriceScale: { visible: false },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
        horzTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: false,
        pinch: false,
        mouseWheel: false,
      },
      crosshair: {
        vertLine: { color: "#758696", visible: false },
        horzLine: { color: "#758696", visible: false },
      },
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2,
      crosshairMarkerVisible: false
    });
    lineSeries.setData(mappedPriceHistory);

    chart.timeScale().fitContent();

    const onResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight, crosshair: {
        mode: LightweightCharts.CrosshairMode.Hidden,
      } });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full relative mb-[21px] pointer-events-none rounded-[12px]"
    />
  );
};

export default TokenChart;
