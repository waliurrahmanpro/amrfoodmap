'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, MapPin, CheckCircle, Info, Move } from 'lucide-react';
import mapPathsData from '@/data/mapPaths.json';
import { District, Division } from '@/types';
import { DISTRICTS, DISTRICT_MAP } from '@/data/districts';
import { calculateDistrictStats } from '@/lib/stats';

interface MapDistrictPath {
  districtId: string;
  rawName: string;
  d: string;
  center: [number, number];
  bounds?: [[number, number], [number, number]];
}

const MAP_PATHS = mapPathsData as MapDistrictPath[];

interface InteractiveMapProps {
  selectedDistrictId: string | null;
  onSelectDistrict: (districtId: string) => void;
  triedFoodIds: string[];
  activeDivision: Division | 'all';
  onToast?: (type: 'success' | 'info' | 'warning' | 'error', message: string, subMessage?: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedDistrictId,
  onSelectDistrict,
  triedFoodIds,
  activeDivision,
  onToast
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Compute stats for all 64 districts
  const districtStatsMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof calculateDistrictStats>>();
    for (const [id, district] of DISTRICT_MAP.entries()) {
      map.set(id, calculateDistrictStats(district, triedFoodIds));
    }
    return map;
  }, [triedFoodIds]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(prev + 0.35, 3.5);
      if (onToast && next !== prev) {
        onToast('info', `মানচিত্র জুম করা হয়েছে (${Math.round(next * 100)}%)`, 'ড্র্যাগ করে মানচিত্র ঘোরাতে পারেন');
      }
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.35, 0.85);
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    if (onToast) {
      onToast('info', 'মানচিত্রের জুম রিসেট করা হয়েছে');
    }
  };

  const handleToggleLabels = () => {
    const nextState = !showLabels;
    setShowLabels(nextState);
    if (onToast) {
      onToast('info', nextState ? 'জেলার নাম (লেবেল) চালু করা হয়েছে' : 'জেলার নাম (লেবেল) লুকানো হয়েছে');
    }
  };

  const handleDistrictClick = (districtId: string) => {
    onSelectDistrict(districtId);
    const d = DISTRICT_MAP.get(districtId);
    if (d && onToast) {
      onToast('success', `${d.bnName} (${d.name}) নির্বাচিত হয়েছে`, 'খাবার তালিকা নিচে প্রদর্শিত হচ্ছে');
    }
  };

  // Mouse & Touch Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    if (isDragging) setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX - panOffset.x,
      y: e.touches[0].clientY - panOffset.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPanOffset({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y
    });
  };

  const handleTouchEnd = () => {
    if (isDragging) setIsDragging(false);
  };

  const hoveredStats = hoveredDistrictId ? districtStatsMap.get(hoveredDistrictId) : null;
  const hoveredDistrict = hoveredDistrictId ? DISTRICT_MAP.get(hoveredDistrictId) : null;
  const hoveredPath = hoveredDistrictId ? MAP_PATHS.find((p) => p.districtId === hoveredDistrictId) : null;

  return (
    <div
      id="map-container"
      className="relative bg-white rounded-3xl border border-[#E6E1D6] p-4 sm:p-6 shadow-md flex flex-col scroll-mt-24"
    >
      {/* Map Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6E1D6]">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0C382E] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] animate-pulse" />
            বাংলাদেশ ফুড ম্যাপ • 64 District Map
          </h2>
          <p className="text-xs text-slate-500">
            মানচিত্রের যেকোনো জেলায় ক্লিক করুন বা ড্রপডাউন থেকে বেছে নিন
          </p>
        </div>

        {/* Map Control Buttons & Quick Selector */}
        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
          {/* Quick District Selector Dropdown */}
          <select
            value={selectedDistrictId || ''}
            onChange={(e) => {
              if (e.target.value) {
                handleDistrictClick(e.target.value);
              }
            }}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] text-slate-700 border border-[#E6E1D6] focus:outline-none focus:ring-2 focus:ring-[#84CC16] cursor-pointer"
            aria-label="Select a district directly"
          >
            <option value="" disabled>
              জেলা নির্বাচন করুন...
            </option>
            {DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.bnName} ({d.name})
              </option>
            ))}
          </select>

          {/* Zoom & Label Buttons */}
          <div className="flex items-center space-x-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E6E1D6]">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition cursor-pointer"
              title="Zoom In (জুম ইন)"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition cursor-pointer"
              title="Zoom Out (জুম আউট)"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition cursor-pointer"
              title="Reset Map Position (রিসেট জুম)"
              aria-label="Reset map"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleToggleLabels}
              className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                showLabels ? 'bg-[#0C382E] text-white shadow-xs' : 'text-slate-700 hover:bg-white'
              }`}
              title="Toggle District Names (জেলার নাম লেবেল চালু/বন্ধ)"
              aria-label="Toggle district labels"
            >
              {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="text-xs">লেবেল</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map SVG Canvas Container with Native SVG Transforms & Pan Support */}
      <div
        className={`relative w-full aspect-[4/5] min-h-[440px] max-h-[660px] overflow-hidden rounded-2xl bg-[#F6F4ED] my-3 border border-[#E6E1D6] flex items-center justify-center select-none ${
          zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          viewBox="0 0 800 1000"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Transformed Group for Zoom & Pan */}
          <g
            transform={`translate(${panOffset.x}, ${panOffset.y}) translate(400, 500) scale(${zoomLevel}) translate(-400, -500)`}
            className="transition-transform duration-100 ease-out"
          >
            {/* District Boundary Paths */}
            {MAP_PATHS.map((item) => {
              const district = DISTRICT_MAP.get(item.districtId);
              const stats = districtStatsMap.get(item.districtId);

              const isSelected = selectedDistrictId === item.districtId;
              const isHovered = hoveredDistrictId === item.districtId;
              const isDivisionMatch =
                activeDivision === 'all' || (district && district.division === activeDivision);

              // Calculate colors based on checklist state
              let fillColor = '#E5DFD3'; // unexplored sand-sage
              let strokeColor = '#A3AF9F';
              let strokeWidth = 1.2;

              if (stats?.status === 'completed') {
                fillColor = '#0C382E'; // deep rich forest green
                strokeColor = '#A3E635';
                strokeWidth = 1.8;
              } else if (stats?.status === 'in-progress') {
                fillColor = '#84CC16'; // fresh lime
                strokeColor = '#06241D';
                strokeWidth = 1.5;
              }

              if (isHovered) {
                if (stats?.status === 'completed') fillColor = '#13463B';
                else if (stats?.status === 'in-progress') fillColor = '#A3E635';
                else fillColor = '#CBD5CD';
                strokeColor = '#0C382E';
                strokeWidth = 2.4;
              }

              if (isSelected) {
                strokeColor = '#F59E0B';
                strokeWidth = 3.5;
              }

              const opacity = isDivisionMatch ? 1 : 0.35;

              return (
                <g
                  key={item.districtId}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDistrictClick(item.districtId);
                  }}
                  onMouseEnter={() => setHoveredDistrictId(item.districtId)}
                  onMouseLeave={() => setHoveredDistrictId(null)}
                  className="cursor-pointer transition-colors duration-150"
                  style={{ opacity }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${district?.bnName || item.rawName} district`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDistrictClick(item.districtId);
                    }
                  }}
                >
                  <path
                    d={item.d}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Pulsing center pin for selected district */}
                  {isSelected && (
                    <g pointerEvents="none">
                      <circle
                        cx={item.center[0]}
                        cy={item.center[1]}
                        r={9}
                        fill="#F59E0B"
                        opacity={0.4}
                        className="animate-ping"
                      />
                      <circle
                        cx={item.center[0]}
                        cy={item.center[1]}
                        r={6}
                        fill="#F59E0B"
                        stroke="#FFFFFF"
                        strokeWidth={2}
                      />
                    </g>
                  )}

                  {/* District Name Label */}
                  {showLabels && (
                    <text
                      x={item.center[0]}
                      y={item.center[1]}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      pointerEvents="none"
                      fontSize={zoomLevel > 1.3 ? '12' : '10'}
                      fontWeight="700"
                      fill={stats?.status === 'completed' ? '#FFFFFF' : '#1C2723'}
                      className="select-none"
                      style={{
                        textShadow:
                          stats?.status === 'completed'
                            ? '0 1px 2px rgba(0,0,0,0.85)'
                            : '0 1px 2px rgba(255,255,255,0.95)'
                      }}
                    >
                      {district?.bnName || item.rawName}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Zoom Level Indicator when Zoomed */}
        {zoomLevel > 1 && (
          <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-[#06241D]/80 text-[#A3E635] text-[11px] font-bold backdrop-blur-xs border border-[#84CC16]/40">
            <Move className="w-3 h-3" />
            <span>জুম {Math.round(zoomLevel * 100)}% (ড্র্যাগ করুন)</span>
          </div>
        )}

        {/* Hover Tooltip / Bottom Information Card */}
        {hoveredDistrict && hoveredStats && hoveredPath && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs z-30 pointer-events-none p-3.5 rounded-2xl bg-[#06241D]/95 text-white backdrop-blur-md border border-[#84CC16]/60 shadow-xl transition-all animate-in fade-in">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-[#A3E635] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {hoveredDistrict.bnName} ({hoveredDistrict.name})
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#13463B] text-emerald-200 font-semibold">
                {hoveredDistrict.divisionBn}
              </span>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-300">
              <span>চেখে দেখা খাবার: {hoveredStats.triedFoods}/{hoveredStats.totalFoods}</span>
              <span className="font-extrabold text-[#A3E635]">{hoveredStats.percentage}%</span>
            </div>

            <div className="mt-1">
              {hoveredStats.status === 'completed' ? (
                <span className="text-[11px] font-bold text-[#A3E635] flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  সম্পূর্ণ সম্পন্ন • 100%
                </span>
              ) : hoveredStats.status === 'in-progress' ? (
                <span className="text-[11px] font-bold text-amber-300">
                  ● চলমান ({hoveredStats.percentage}%)
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  ○ এখনও স্বাদ গ্রহণ বাকি (ক্লিক করে খাবার দেখুন)
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-2 pt-3 border-t border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#0C382E] border border-[#A3E635]" />
            <span className="text-slate-600 font-medium">সম্পূর্ণ সম্পন্ন (All Tried)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#84CC16] border border-[#06241D]" />
            <span className="text-slate-600 font-medium">চলমান (In Progress)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#E5DFD3] border border-[#A3AF9F]" />
            <span className="text-slate-600 font-medium">অনাঘ্রাত (Unexplored)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#E5DFD3] border-2 border-[#F59E0B]" />
            <span className="text-slate-600 font-medium">নির্বাচিত জেলা (Selected)</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-slate-500 text-[11px]">
          <Info className="w-3 h-3 text-[#0C382E]" />
          <span>উৎস: BBS & geoBoundaries নির্ভুল সীমানা</span>
        </div>
      </div>
    </div>
  );
};
