import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() body: any) {
    return {
      message: 'Auth service initialized',
      user: { id: 'usr_1', email: body.email || 'user@example.com', name: 'Demo User' },
      token: 'demo-jwt-token-sample',
    };
  }
}
