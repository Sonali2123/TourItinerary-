import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Check API service health' })
  checkHealth() {
    return {
      status: 'ok',
      service: 'Tour Itinerary NestJS API',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
