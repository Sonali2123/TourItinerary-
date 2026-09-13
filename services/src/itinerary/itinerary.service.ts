import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateItineraryDto } from './dto/generate-itinerary.dto';
import OpenAI from 'openai';

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
  private readonly logger = new Logger(ItineraryService.name);
  private openai: OpenAI | null = null;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey && apiKey !== 'sk-proj-your-openai-api-key' && apiKey.trim().length > 0) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log('🤖 OpenAI Service initialized for AI Tour Itinerary generation.');
    } else {
      this.logger.warn('⚠️ OPENAI_API_KEY missing or default placeholder. Using template generator.');
    }
  }

  async generateItinerary(dto: GenerateItineraryDto): Promise<GeneratedItineraryResponse> {
    const { destination, durationDays, budgetAmount, currency = 'INR', travelStyle = 'Adventure trip' } = dto;

    // If OpenAI API key is active, call OpenAI Chat API with JSON response format
    if (this.openai) {
      try {
        this.logger.log(`Generating AI Itinerary with OpenAI for: ${durationDays} days in ${destination} (${travelStyle})`);

        const prompt = `You are an expert AI Travel Planner. Create a detailed ${durationDays}-day travel itinerary for ${destination}.
Travel style: ${travelStyle}
Total budget: ${currency} ${budgetAmount}

Return ONLY valid JSON matching this exact structure:
{
  "title": "${durationDays}-Day ${travelStyle} in ${destination}",
  "summary": "Brief 2-sentence summary of the trip",
  "dayPlans": [
    {
      "dayNumber": 1,
      "title": "Day 1 Title",
      "overview": "Overview of Day 1",
      "activities": [
        {
          "timeSlot": "09:00 AM",
          "title": "Activity Name",
          "description": "Activity detail description",
          "location": "Location Name",
          "estimatedCost": 500
        }
      ]
    }
  ]
}`;

        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: 'You are a professional travel planner that outputs strict JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            id: `ai_openai_${Date.now()}`,
            title: parsed.title || `${durationDays}-Day ${travelStyle} in ${destination}`,
            destination,
            durationDays,
            budgetAmount,
            currency,
            travelStyle,
            summary: parsed.summary || `Custom ${durationDays}-day ${travelStyle.toLowerCase()} itinerary for ${destination}.`,
            dayPlans: parsed.dayPlans || [],
          };
        }
      } catch (error) {
        this.logger.error('Failed to generate with OpenAI API, falling back to local engine', error);
      }
    }

    // Local engine fallback
    const dailyBudget = Math.round(budgetAmount / durationDays);
    const dayPlans: DayPlanItem[] = Array.from({ length: durationDays }, (_, idx) => {
      const dayNum = idx + 1;
      return {
        dayNumber: dayNum,
        title: `Day ${dayNum}: ${destination} ${travelStyle}`,
        overview: `Full day exploration of ${destination} optimized for ${travelStyle.toLowerCase()} lovers.`,
        activities: [
          {
            timeSlot: '08:30 AM',
            title: 'Morning Breakfast & Cafe Chill',
            description: `Start day ${dayNum} with authentic regional food in ${destination}.`,
            location: `${destination} City Center`,
            estimatedCost: Math.round(dailyBudget * 0.15),
          },
          {
            timeSlot: '11:00 AM',
            title: dayNum === 1 ? 'Water Sports & Beach Adventure' : dayNum === 2 ? 'Heritage Sightseeing & Fort Walk' : 'Island Cruise & Sunset View',
            description: `Highlight excursion for ${destination} ${travelStyle.toLowerCase()}.`,
            location: `${destination} Key Landmark`,
            estimatedCost: Math.round(dailyBudget * 0.45),
          },
          {
            timeSlot: '04:30 PM',
            title: 'Scenic Viewpoint & Sundowner',
            description: 'Panoramas, photography, and coastal breeze.',
            location: `${destination} Panoramic Deck`,
            estimatedCost: Math.round(dailyBudget * 0.15),
          },
          {
            timeSlot: '08:00 PM',
            title: 'Dinner & Night Market Walk',
            description: 'Experience local food, music, and vibrant night markets.',
            location: `${destination} Night Strip`,
            estimatedCost: Math.round(dailyBudget * 0.25),
          },
        ],
      };
    });

    return {
      id: `itinerary_${Date.now()}`,
      title: `${durationDays}-Day ${travelStyle} in ${destination}`,
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
