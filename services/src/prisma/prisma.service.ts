import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Connect to database if DATABASE_URL is present
    if (process.env.DATABASE_URL) {
      try {
        await this.$connect();
      } catch (error) {
        console.warn('Prisma database connection pending active PostgreSQL configuration.');
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
