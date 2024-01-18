import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Got project version successfully.',
  })
  @ApiOperation({
    summary: 'Info',
    description: 'Returns current project version.',
  })
  info(): string {
    return this.appService.info();
  }
}
