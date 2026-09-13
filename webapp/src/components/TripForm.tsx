'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { MapPin, Calendar, IndianRupee, Flame, Sparkles, Loader2 } from 'lucide-react';
import { useTripStore } from '../lib/store/useTripStore';
import { fetchGeneratedItinerary } from '../lib/api/itinerary';

export default function TripForm() {
  const {
    destination,
    durationDays,
    budgetAmount,
    travelStyle,
    setDestination,
    setDurationDays,
    setBudgetAmount,
    setTravelStyle,
    setItinerary,
  } = useTripStore();

  const mutation = useMutation({
    mutationFn: fetchGeneratedItinerary,
    onSuccess: (data) => {
      setItinerary(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      destination,
      durationDays,
      budgetAmount,
      travelStyle,
    });
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <Sparkles className="w-4 h-4" />
        <span>Instant AI Itinerary Generator</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
        Plan Your Next Escape
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-400">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-sky-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Goa, Paris"
              className="w-full bg-gray-900/90 text-white rounded-xl pl-9 pr-4 py-3 text-sm border border-gray-800 focus:border-sky-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Days */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-400">Duration (Days)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-sky-400" />
            <input
              type="number"
              min={1}
              max={30}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full bg-gray-900/90 text-white rounded-xl pl-9 pr-4 py-3 text-sm border border-gray-800 focus:border-sky-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-400">Budget (₹)</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-sky-400" />
            <input
              type="number"
              step={1000}
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(Number(e.target.value))}
              className="w-full bg-gray-900/90 text-white rounded-xl pl-9 pr-4 py-3 text-sm border border-gray-800 focus:border-sky-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Style */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-400">Trip Style</label>
          <div className="relative">
            <Flame className="absolute left-3 top-3.5 h-4 w-4 text-sky-400" />
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full bg-gray-900/90 text-white rounded-xl pl-9 pr-4 py-3 text-sm border border-gray-800 focus:border-sky-500 focus:outline-none transition-colors appearance-none"
            >
              <option value="Adventure trip">Adventure Trip</option>
              <option value="Relaxation & Beach">Relaxation & Beach</option>
              <option value="Cultural & Heritage">Cultural & Heritage</option>
              <option value="Luxury Experience">Luxury Experience</option>
              <option value="Backpacker Budget">Backpacker Budget</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div className="md:col-span-4 mt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating AI Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate Itinerary ({durationDays} Days in {destination} • ₹{budgetAmount.toLocaleString()})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
