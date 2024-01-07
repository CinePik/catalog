import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ManualHealthIndicator } from './manual.health';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [ManualHealthIndicator, PrismaService],
})
export class HealthModule {}
