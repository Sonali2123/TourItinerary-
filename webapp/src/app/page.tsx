'use client';

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import TripForm from '../components/TripForm';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { useTripStore } from '../lib/store/useTripStore';
import { fetchGeneratedItinerary } from '../lib/api/itinerary';
import { Sparkles, Zap, ShieldCheck, Database, Layers, ArrowRight } from 'lucide-react';

export default function Home() {
  const { currentItinerary, setItinerary } = useTripStore();

  // Auto load demo itinerary on first render matching Goa specs
  useEffect(() => {
    if (!currentItinerary) {
      fetchGeneratedItinerary({
        destination: 'Goa',
        durationDays: 3,
        budgetAmount: 30000,
        travelStyle: 'Adventure trip',
      }).then(setItinerary);
    }
  }, [currentItinerary, setItinerary]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Full-Stack Architecture Ready</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            AI Tour <span className="gradient-text">Itinerary Generator</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Generate customized day-by-day travel plans based on duration, budget, and travel style.
            Powered by Next.js, Expo React Native, NestJS, and Prisma ORM.
          </p>
        </section>

        {/* Trip Form Generator */}
        <TripForm />

        {/* Generated Itinerary Display */}
        <ItineraryDisplay />

        {/* Architecture Highlights */}
        <section className="pt-12 border-t border-gray-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-gray-800">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Web & Mobile Shared Architecture</h3>
            <p className="text-gray-400 text-sm">
              Next.js (Web) and Expo React Native (Mobile) sharing types, TanStack Query, and Zustand state.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gray-800">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">NestJS & Prisma Backend</h3>
            <p className="text-gray-400 text-sm">
              PostgreSQL relational schema for itineraries, day plans, activities, users, and booking payments.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gray-800">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Production Integrations</h3>
            <p className="text-gray-400 text-sm">
              Pre-built endpoints for OpenAI/Gemini AI models, Auth.js/Clerk, Redis caching, and Stripe/Razorpay payments.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800/80 py-8 bg-gray-950 text-center text-xs text-gray-500">
        Tour Itinerary Full Stack Workspace • Next.js + Expo React Native + NestJS
      </footer>
    </div>
  );
}
