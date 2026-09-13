import { Itinerary } from '../store/useTripStore';

export interface GenerateTripParams {
  destination: string;
  durationDays: number;
  budgetAmount: number;
  travelStyle: string;
}

export async function fetchGeneratedItinerary(params: GenerateTripParams): Promise<Itinerary> {
  // Try connecting to NestJS backend if available, fallback to mock engine
  try {
    const res = await fetch('http://localhost:4000/itinerary/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend server offline, generating fallback client itinerary.');
  }

  // Fallback dynamic generator matching prompt specs
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
