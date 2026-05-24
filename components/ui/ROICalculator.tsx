'use client';

import { useState } from 'react';

const MAX_CVR = 8;

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

function fmtCVR(n: number) {
  return n.toFixed(1) + '%';
}

export function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(30000);
  const [currentCVR, setCurrentCVR]         = useState(1.5);
  const [avgOrderValue, setAvgOrderValue]   = useState(85);

  const projectedCVR     = Math.min(currentCVR * 2.4, MAX_CVR);
  const projectedRevenue = monthlyRevenue * (projectedCVR / currentCVR);
  const revenueUplift    = projectedRevenue - monthlyRevenue;

  const sliderClass = 'roi-slider w-full cursor-pointer';

  return (
    <div
      className="rounded-xl p-8"
      style={{ background: '#141416', border: '1px solid #232327' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h3 className="font-display text-lg font-bold text-[#FAFAFA]">
          Revenue impact calculator
        </h3>
        <span
          className="text-[11px] text-[#A1A1AA] px-2.5 py-1 rounded-full"
          style={{ background: '#0A0A0B', border: '1px solid #232327' }}
        >
          Based on our avg 2.4× CVR lift
        </span>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-6 mb-6">
        {/* Monthly revenue */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-[#A1A1AA]">Monthly store revenue</label>
            <span className="text-sm font-semibold text-[#CCFF00]">
              {fmt(monthlyRevenue)}
            </span>
          </div>
          <input
            type="range"
            className={sliderClass}
            min={5000}
            max={500000}
            step={5000}
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
          />
        </div>

        {/* Current CVR */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-[#A1A1AA]">Current CVR</label>
            <span className="text-sm font-semibold text-[#CCFF00]">
              {fmtCVR(currentCVR)}
            </span>
          </div>
          <input
            type="range"
            className={sliderClass}
            min={0.5}
            max={5.0}
            step={0.1}
            value={currentCVR}
            onChange={(e) => setCurrentCVR(Number(e.target.value))}
          />
        </div>

        {/* Avg order value */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-[#A1A1AA]">Avg order value</label>
            <span className="text-sm font-semibold text-[#CCFF00]">
              ${Math.round(avgOrderValue)}
            </span>
          </div>
          <input
            type="range"
            className={sliderClass}
            min={20}
            max={500}
            step={5}
            value={avgOrderValue}
            onChange={(e) => setAvgOrderValue(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Results */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6"
        style={{ borderTop: '1px solid #232327' }}
      >
        {/* Current */}
        <div
          className="rounded-lg p-4 transition-all duration-300"
          style={{ background: '#0A0A0B', border: '1px solid #232327' }}
        >
          <p className="text-[11px] uppercase tracking-widest text-[#A1A1AA] mb-2">
            Current monthly revenue
          </p>
          <p className="font-display text-2xl font-bold text-[#FAFAFA]">
            {fmt(monthlyRevenue)}
          </p>
        </div>

        {/* Projected */}
        <div
          className="rounded-lg p-4 transition-all duration-300"
          style={{ background: '#0f1a00', border: '1px solid rgba(204,255,0,0.4)' }}
        >
          <p className="text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-1">
            After our redesign
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#A1A1AA] mb-2">
            Projected revenue
          </p>
          <p className="font-display text-2xl font-bold text-[#CCFF00]">
            {fmt(projectedRevenue)}
          </p>
        </div>

        {/* Uplift */}
        <div
          className="rounded-lg p-4 transition-all duration-300"
          style={{ background: '#0A0A0B', border: '1px solid #232327' }}
        >
          <p className="text-[11px] uppercase tracking-widest text-[#A1A1AA] mb-2">
            Monthly uplift
          </p>
          <p
            className="font-display text-2xl font-bold"
            style={{ color: revenueUplift > 0 ? '#CCFF00' : '#FAFAFA' }}
          >
            +{fmt(revenueUplift)}
          </p>
          <p className="text-xs text-[#A1A1AA] mt-1">extra per month</p>
        </div>
      </div>

      {/* Footer note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4">
        <p className="text-xs text-[#A1A1AA]">
          This is a conservative estimate based on median client results.
        </p>
        <a
          href="#work"
          className="text-xs text-[#CCFF00] hover:underline whitespace-nowrap"
        >
          See our case studies →
        </a>
      </div>
    </div>
  );
}
