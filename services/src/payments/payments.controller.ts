import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  @Post('create-order')
  @ApiOperation({ summary: 'Create Razorpay/Stripe Payment Order' })
  async createOrder(@Body() body: { itineraryId: string; amount: number; provider?: string }) {
    const provider = body.provider || 'RAZORPAY';
    return {
      orderId: `order_${Date.now()}`,
      provider,
      amount: body.amount,
      currency: 'INR',
      status: 'created',
      itineraryId: body.itineraryId,
    };
  }
}
