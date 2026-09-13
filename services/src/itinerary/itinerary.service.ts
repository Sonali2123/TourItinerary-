import { Injectable } from '@nestjs/common';
import { GenerateItineraryDto } from './dto/generate-itinerary.dto';

export interface ActivityItem {
  timeSlot: string;
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
}

export interface DayPlanItem {
  dayNumber: number;
  title: string;
  overview: string;
  activities: ActivityItem[];
}

export interface GeneratedItineraryResponse {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  budgetAmount: number;
  currency: string;
  travelStyle: string;
  summary: string;
  dayPlans: DayPlanItem[];
}

@Injectable()
export class ItineraryService {
  async generateItinerary(dto: GenerateItineraryDto): Promise<GeneratedItineraryResponse> {
    const { destination, durationDays, budgetAmount, currency = 'INR', travelStyle = 'Adventure' } = dto;
    const dailyBudget = Math.round(budgetAmount / durationDays);

    // AI Generator Stub / Engine Output Template
    const dayPlans: DayPlanItem[] = Array.from({ length: durationDays }, (_, idx) => {
      const dayNum = idx + 1;
      return {
        dayNumber: dayNum,
        title: `Day ${dayNum}: ${destination} Exploration & ${travelStyle}`,
        overview: `Full day itinerary exploring top spots in ${destination} tailored for a ${travelStyle.toLowerCase()} vibe.`,
        activities: [
          {
            timeSlot: '08:30 AM',
            title: `Morning Kickoff & Local Breakfast`,
            description: `Start your day with local culinary specialties in ${destination}.`,
            location: `${destination} City Center`,
            estimatedCost: Math.round(dailyBudget * 0.15),
          },
          {
            timeSlot: '11:00 AM',
            title: dayNum === 1 ? 'Water Sports & Beach Adventure' : dayNum === 2 ? 'Heritage Sightseeing & Fort Walk' : 'Island Cruise & Sunset View',
            description: `Primary adventure highlight for Day ${dayNum} in ${destination}.`,
            location: `${destination} Attraction Hub`,
            estimatedCost: Math.round(dailyBudget * 0.45),
          },
          {
            timeSlot: '04:30 PM',
            title: 'Scenic Viewpoint & Cafe Break',
            description: 'Relaxation, photos, and local snacks.',
            location: `${destination} Panoramic Deck`,
            estimatedCost: Math.round(dailyBudget * 0.15),
          },
          {
            timeSlot: '08:00 PM',
            title: 'Dinner & Night Market Walk',
            description: 'Experience local nightlife and dinner.',
            location: `${destination} Night Market`,
            estimatedCost: Math.round(dailyBudget * 0.25),
          },
        ],
      };
    });

    return {
      id: `itinerary_${Date.now()}`,
      title: `${durationDays}-Day ${travelStyle} Itinerary in ${destination}`,
      destination,
      durationDays,
      budgetAmount,
      currency,
      travelStyle,
      summary: `Tailored ${durationDays}-day ${travelStyle.toLowerCase()} itinerary for ${destination} within a ${currency} ${budgetAmount.toLocaleString()} budget.`,
      dayPlans,
    };
  }
}
