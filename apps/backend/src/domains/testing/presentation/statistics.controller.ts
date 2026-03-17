import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { StatisticsService } from '../application/statistics.service';

@ApiTags('Testing Statistics')
@Controller('testing')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('my-tests')
  @ApiOperation({ summary: 'История тестов пользователя' })
  async getMyTests(
    @Request() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.statisticsService.getUserTests(req.user.userId, page, limit);
  }

  @Get('my-stats')
  @ApiOperation({ summary: 'Статистика пользователя' })
  async getMyStats(@Request() req: any) {
    return this.statisticsService.getUserStats(req.user.userId);
  }
}
