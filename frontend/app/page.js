'use client';

import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const chartContainerRef = useRef(null);
  const [symbol, setSymbol] = useState('BINANCE:BTCUSDT');
  const [interval, setInterval] = useState('1');
  const [chartType, setChartType] = useState('candlesticks'); // default type

  // Load TradingView chart script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      renderChart();
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup TradingView container
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render chart on changes
  useEffect(() => {
    if (window.TradingView) {
      renderChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, interval, chartType]);

  const renderChart = () => {
    if (!chartContainerRef.current) return;

    chartContainerRef.current.innerHTML = '';

    new window.TradingView.widget({
      container_id: chartContainerRef.current.id,
      autosize: true,
      symbol: symbol,
      interval: interval,
      theme: 'light',
      style: getChartStyle(chartType),
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      hide_side_toolbar: false,
      save_image: false,
    });
  };

  const getChartStyle = (type) => {
    const styles = {
      candlesticks: 1,
      bars: 0,
      hollow_candles: 9,
      line: 2,
      area: 3,
      baseline: 8,
    };
    return styles[type] ?? 1;
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Trading Chart Dashboard</h1>

      <div className="flex flex-wrap gap-4 justify-center w-full max-w-5xl mb-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">Ticker</label>
          <select
            className="p-2 border rounded"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          >
            <option value="BINANCE:BTCUSDT">BTC/USDT</option>
            <option value="BINANCE:ETHUSDT">ETH/USDT</option>
            <option value="BINANCE:BNBUSDT">BNB/USDT</option>
            <option value="NASDAQ:AAPL">Apple (AAPL)</option>
            <option value="NASDAQ:MSFT">Microsoft (MSFT)</option>
            <option value="NASDAQ:TSLA">Tesla (TSLA)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">Chart Type</label>
          <select
            className="p-2 border rounded"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="candlesticks">Candlesticks</option>
            <option value="bars">Bars</option>
            <option value="hollow_candles">Hollow Candles</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="baseline">Baseline</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">Timeframe</label>
          <select
            className="p-2 border rounded"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <option value="1">1 Minute</option>
            <option value="5">5 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="D">1 Day</option>
            <option value="W">1 Week</option>
            <option value="M">1 Month</option>
          </select>
        </div>
      </div>

      <div
        id="tradingview_chart"
        ref={chartContainerRef}
        className="w-full max-w-5xl h-[600px] shadow-md rounded border"
      />
    </main>
  );
}
