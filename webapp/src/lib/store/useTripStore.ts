import { create } from 'zustand';

export interface Activity {
  timeSlot: string;
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  overview: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  budgetAmount: number;
  currency: string;
  travelStyle: string;
  summary: string;
  dayPlans: DayPlan[];
}

interface TripState {
  destination: string;
  durationDays: number;
  budgetAmount: number;
  travelStyle: string;
  currentItinerary: Itinerary | null;
  setDestination: (destination: string) => void;
  setDurationDays: (days: number) => void;
  setBudgetAmount: (budget: number) => void;
  setTravelStyle: (style: string) => void;
  setItinerary: (itinerary: Itinerary) => void;
}

export const useTripStore = create<TripState>((set) => ({
  destination: 'Goa',
  durationDays: 3,
  budgetAmount: 30000,
  travelStyle: 'Adventure trip',
  currentItinerary: null,
  setDestination: (destination) => set({ destination }),
  setDurationDays: (durationDays) => set({ durationDays }),
  setBudgetAmount: (budgetAmount) => set({ budgetAmount }),
  setTravelStyle: (travelStyle) => set({ travelStyle }),
  setItinerary: (currentItinerary) => set({ currentItinerary }),
}));
