'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [ticker, setTicker] = useState('BTCUSDT');
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('1m');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Chart Settings</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <div>
          <label className="block mb-1 font-medium">Select Ticker:</label>
          <select
            className="w-full p-2 border rounded"
            value={ticker}
            onChange={e => setTicker(e.target.value)}
          >
            <option>BTCUSDT</option>
            <option>ETHUSDT</option>
            <option>BNBUSDT</option>
            <option>XRPUSDT</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Chart Type:</label>
          <select
            className="w-full p-2 border rounded"
            value={chartType}
            onChange={e => setChartType(e.target.value)}
          >
            <option value="candlestick">Candlestick</option>
            <option value="bar">Bar</option>
            <option value="hollow">Hollow Candle</option>
            <option value="volume">Volume Candle</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Timeframe:</label>
          <select
            className="w-full p-2 border rounded"
            value={timeframe}
            onChange={e => setTimeframe(e.target.value)}
          >
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
            <option value="1mo">1 Month</option>
          </select>
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
