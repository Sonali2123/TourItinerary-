'use client';

import React, { useState } from 'react';
import { Clock, MapPin, DollarSign, CheckCircle2, ChevronRight, Share2, Download, Bookmark } from 'lucide-react';
import { useTripStore } from '../lib/store/useTripStore';

export default function ItineraryDisplay() {
  const { currentItinerary } = useTripStore();
  const [activeDay, setActiveDay] = useState(1);

  if (!currentItinerary) {
    return null;
  }

  const activePlan = currentItinerary.dayPlans.find((d) => d.dayNumber === activeDay) || currentItinerary.dayPlans[0];

  return (
    <div className="mt-10 space-y-6">
      {/* Header Info Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-sky-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span>{currentItinerary.travelStyle}</span>
              <span>•</span>
              <span>{currentItinerary.durationDays} Days</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{currentItinerary.title}</h1>
            <p className="text-gray-400 text-sm mt-1">{currentItinerary.summary}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-gray-900/80 px-4 py-2 rounded-2xl border border-gray-800 text-right">
              <div className="text-xs text-gray-400">Total Budget</div>
              <div className="text-xl font-black text-amber-400">₹{currentItinerary.budgetAmount.toLocaleString()}</div>
            </div>
            <button className="p-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors border border-gray-800">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors border border-gray-800">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex space-x-2 mt-6 overflow-x-auto pb-2 scrollbar-none border-t border-gray-800/60 pt-4">
          {currentItinerary.dayPlans.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDay(day.dayNumber)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center space-x-2 ${
                activeDay === day.dayNumber
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-gray-800/50'
              }`}
            >
              <span>Day {day.dayNumber}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Day Activities Timeline */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-800">
        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-sky-400"></span>
            <span>{activePlan.title}</span>
          </h3>
          <p className="text-gray-400 text-sm mt-1">{activePlan.overview}</p>
        </div>

        <div className="relative border-l-2 border-sky-500/30 ml-4 space-y-8 pl-6">
          {activePlan.activities.map((act, index) => (
            <div key={index} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-gray-950 border-2 border-sky-400 group-hover:scale-125 group-hover:bg-sky-400 transition-all" />

              <div className="glass-card p-5 rounded-2xl border border-gray-800/80 hover:border-sky-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{act.timeSlot}</span>
                  </div>
                  <div className="text-xs text-amber-400 font-medium bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 self-start sm:self-auto">
                    Est. ₹{act.estimatedCost.toLocaleString()}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {act.title}
                </h4>
                <p className="text-gray-300 text-sm mt-1.5 leading-relaxed">
                  {act.description}
                </p>

                <div className="flex items-center space-x-1.5 text-gray-400 text-xs mt-3 pt-3 border-t border-gray-800/60">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{act.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
