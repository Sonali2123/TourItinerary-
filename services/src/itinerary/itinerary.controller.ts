import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItineraryService } from './itinerary.service';
import { GenerateItineraryDto } from './dto/generate-itinerary.dto';

@ApiTags('itinerary')
@Controller('itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate AI Tour Itinerary' })
  @ApiResponse({ status: 201, description: 'Itinerary generated successfully' })
  async generate(@Body() dto: GenerateItineraryDto) {
    return this.itineraryService.generateItinerary(dto);
  }

  @Get('sample')
  @ApiOperation({ summary: 'Get a sample 3-day Goa Itinerary' })
  async getSample() {
    return this.itineraryService.generateItinerary({
      destination: 'Goa',
      durationDays: 3,
      budgetAmount: 30000,
      currency: 'INR',
      travelStyle: 'Adventure trip',
    });
  }
}
