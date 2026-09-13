import { Itinerary } from '../store/useTripStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface GenerateTripParams {
  destination: string;
  durationDays: number;
  budgetAmount: number;
  travelStyle: string;
}

export interface BackendHealth {
  status: string;
  service: string;
  timestamp: string;
}

/**
 * Check health status of NestJS backend service
 */
export async function checkBackendHealth(): Promise<BackendHealth | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // API backend offline
  }
  return null;
}

/**
 * Call NestJS POST /itinerary/generate API endpoint
 */
export async function fetchGeneratedItinerary(params: GenerateTripParams): Promise<Itinerary> {
  try {
    const res = await fetch(`${API_BASE_URL}/itinerary/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Received itinerary from NestJS API Backend:', data);
      return data;
    }
  } catch (err) {
    console.warn('⚠️ NestJS API Server offline. Using dynamic client fallback engine.');
  }

  // Fallback client generator engine if server is offline
  const { destination, durationDays, budgetAmount, travelStyle } = params;
  const dailyBudget = Math.round(budgetAmount / durationDays);

  const dayPlans = Array.from({ length: durationDays }, (_, idx) => {
    const dayNum = idx + 1;
    return {
      dayNumber: dayNum,
      title: `Day ${dayNum}: ${destination} ${travelStyle}`,
      overview: `Full day exploration of ${destination} optimized for ${travelStyle.toLowerCase()} lovers with curated stops.`,
      activities: [
        {
          timeSlot: '08:30 AM',
          title: 'Morning Breakfast & Cafe Chill',
          description: `Kick off day ${dayNum} with authentic regional delicacies.`,
          location: `${destination} Coastline`,
          estimatedCost: Math.round(dailyBudget * 0.15),
        },
        {
          timeSlot: '11:00 AM',
          title: dayNum === 1 ? 'Water Sports & Beach Hopping' : dayNum === 2 ? 'Fort Aguada & Cultural Heritage Tour' : 'Dudhsagar Waterfalls & Jungle Trek',
          description: `Highlight excursion for ${destination} adventure trip.`,
          location: `${destination} Key Landmark`,
          estimatedCost: Math.round(dailyBudget * 0.45),
        },
        {
          timeSlot: '04:30 PM',
          title: 'Sunset Viewpoint & Sundowner',
          description: 'Panoramas, photography, and coastal breeze.',
          location: `${destination} Hilltop Deck`,
          estimatedCost: Math.round(dailyBudget * 0.15),
        },
        {
          timeSlot: '08:00 PM',
          title: 'Dinner at Beach Shack & Night Market',
          description: 'Live acoustic music, fresh seafood, and vibrant market stalls.',
          location: `${destination} Night Strip`,
          estimatedCost: Math.round(dailyBudget * 0.25),
        },
      ],
    };
  });

  return {
    id: `web_itinerary_${Date.now()}`,
    title: `${durationDays} Days in ${destination}`,
    destination,
    durationDays,
    budgetAmount,
    currency: '₹',
    travelStyle,
    summary: `Exquisite ${durationDays}-day ${travelStyle.toLowerCase()} itinerary for ${destination} staying within ₹${budgetAmount.toLocaleString()} budget.`,
    dayPlans,
  };
}
