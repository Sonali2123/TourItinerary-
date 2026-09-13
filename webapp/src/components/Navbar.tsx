import React from 'react';
import { Compass, Sparkles, MapPin, Smartphone, Server, Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Compass className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-tight">
              Tour<span className="gradient-text">Itinerary</span>
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              AI Powered
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-400">
          <div className="flex items-center space-x-1 text-sky-400 font-semibold">
            <Globe className="w-4 h-4" />
            <span>Web App (Next.js)</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-gray-200 transition-colors">
            <Smartphone className="w-4 h-4" />
            <span>Mobile (Expo RN)</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-gray-200 transition-colors">
            <Server className="w-4 h-4" />
            <span>Backend (NestJS + Prisma)</span>
          </div>
        </nav>

        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>New Itinerary</span>
        </button>
      </div>
    </header>
  );
}
