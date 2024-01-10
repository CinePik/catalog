import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';
import { ManualHealthIndicator } from './manual.health';
import { ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private manualHealthIndicator: ManualHealthIndicator,
  ) {}

  @Get('live')
  @Unprotected()
  @HealthCheck()
  checkLiveness() {
    return this.health.check([
      () => this.manualHealthIndicator.isHealthyCheck('manual'),
    ]);
  }

  @Get('ready')
  @Unprotected()
  @HealthCheck()
  checkReadiness() {
    // TODO: Add HTTP health check to ping external API
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.prisma.pingCheck('prisma', this.prismaService),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.9 }), // if more than 90% of disk space is used
      () => this.memory.checkHeap('memory_heap', 256 * 1024 * 1024), // if more than 256MiB
      () => this.manualHealthIndicator.isHealthyCheck('manual'),
    ]);
  }

  @Post('toggle')
  @Unprotected()
  @HttpCode(HttpStatus.NO_CONTENT)
  toggleHealth() {
    this.manualHealthIndicator.toggleHealth();
  }
}
