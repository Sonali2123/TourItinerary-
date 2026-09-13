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
