import { create } from 'zustand';
import { Itinerary } from '../types';

interface MobileTripState {
  destination: string;
  durationDays: number;
  budgetAmount: number;
  travelStyle: string;
  itinerary: Itinerary | null;
  setDestination: (destination: string) => void;
  setDurationDays: (days: number) => void;
  setBudgetAmount: (budget: number) => void;
  setTravelStyle: (style: string) => void;
  setItinerary: (itinerary: Itinerary) => void;
}

export const useMobileTripStore = create<MobileTripState>((set) => ({
  destination: 'Goa',
  durationDays: 3,
  budgetAmount: 30000,
  travelStyle: 'Adventure trip',
  itinerary: {
    id: 'mob_sample_1',
    title: '3-Day Goa Adventure Trip',
    destination: 'Goa',
    durationDays: 3,
    budgetAmount: 30000,
    currency: '₹',
    travelStyle: 'Adventure trip',
    summary: 'Tailored 3-day adventure trip in Goa with water sports, heritage forts, and night markets within ₹30,000 budget.',
    dayPlans: [
      {
        dayNumber: 1,
        title: 'Day 1: Water Sports & Baga Beach',
        overview: 'Exhilarating day enjoying jet skis, parasailing, and sunset shacks.',
        activities: [
          { timeSlot: '09:00 AM', title: 'Calangute Breakfast', description: 'Traditional Goan poee and tea', location: 'Calangute', estimatedCost: 450 },
          { timeSlot: '11:30 AM', title: 'Baga Water Sports', description: 'Parasailing and Jet Ski sessions', location: 'Baga Beach', estimatedCost: 3500 },
          { timeSlot: '05:00 PM', title: 'Anjuna Sunset Point', description: 'Cliff views and sundown mocktails', location: 'Anjuna Cliff', estimatedCost: 800 },
        ]
      },
      {
        dayNumber: 2,
        title: 'Day 2: Fort Aguada & Panjim Heritage',
        overview: 'Historic Portuguese architecture, colorful Fontainhas alleys, and casino cruise.',
        activities: [
          { timeSlot: '10:00 AM', title: 'Fort Aguada Exploration', description: '17th-century lighthouse and ocean views', location: 'Sinquerim', estimatedCost: 200 },
          { timeSlot: '02:00 PM', title: 'Latin Quarter Walk', description: 'Fontainhas heritage houses and art cafes', location: 'Panjim', estimatedCost: 1200 },
        ]
      },
      {
        dayNumber: 3,
        title: 'Day 3: Dudhsagar Waterfalls & Departure',
        overview: 'Jeep safari into Bhagwan Mahavir Wildlife Sanctuary.',
        activities: [
          { timeSlot: '07:00 AM', title: 'Dudhsagar Jeep Trek', description: 'Off-road jungle drive and natural pool swim', location: 'Kulem', estimatedCost: 2800 },
        ]
      }
    ]
  },
  setDestination: (destination) => set({ destination }),
  setDurationDays: (durationDays) => set({ durationDays }),
  setBudgetAmount: (budgetAmount) => set({ budgetAmount }),
  setTravelStyle: (travelStyle) => set({ travelStyle }),
  setItinerary: (itinerary) => set({ itinerary }),
}));
