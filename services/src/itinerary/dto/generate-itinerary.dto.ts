import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateItineraryDto {
  @ApiProperty({ example: 'Goa, India', description: 'Destination city or region' })
  @IsString()
  destination: string;

  @ApiProperty({ example: 3, description: 'Duration in days' })
  @IsNumber()
  @Min(1)
  @Max(30)
  durationDays: number;

  @ApiProperty({ example: 30000, description: 'Budget amount in local currency' })
  @IsNumber()
  @Min(1000)
  budgetAmount: number;

  @ApiProperty({ example: 'INR', description: 'Currency code', default: 'INR' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 'Adventure trip', description: 'Travel style or preferences' })
  @IsString()
  @IsOptional()
  travelStyle?: string;
}
