import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TestingService } from '../application/testing.service';
import { TestMode } from '../../../shared/types/testing.types';
import { IsEnum, IsUUID, IsInt, Min, Max, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OptionalJwtAuthGuard } from '../../../shared/guards/optional-jwt-auth.guard';

export class StartTestDto {
  @IsUUID()
  profQualId: string;

  @IsEnum(TestMode)
  mode: TestMode;

  @IsInt()
  @Min(1)
  @Max(500)
  @Type(() => Number)
  questionCount: number;
}

export class SubmitAnswerDto {
  @IsUUID()
  questionId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  selectedOptionIds?: string[];

  @IsUUID()
  @IsOptional()
  selectedOptionId?: string;
}

@ApiTags('Testing')
@Controller('testing')
@UseGuards(OptionalJwtAuthGuard)
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Post('start')
  @ApiOperation({ summary: 'Начать тест' })
  async startTest(@Body() dto: StartTestDto, @Request() req: any) {
    const userId = req.user?.userId ?? null;
    return this.testingService.startTest(
      dto.profQualId,
      dto.mode,
      dto.questionCount,
      userId,
    );
  }

  @Get(':testId')
  @ApiOperation({ summary: 'Состояние теста' })
  async getTestState(@Param('testId') testId: string, @Request() req: any) {
    const userId = req.user?.userId ?? null;
    return this.testingService.getTestState(testId, userId);
  }

  @Get(':testId/question/:num')
  @ApiOperation({ summary: 'Получить вопрос по номеру' })
  async getQuestion(
    @Param('testId') testId: string,
    @Param('num', ParseIntPipe) num: number,
    @Request() req: any,
  ) {
    const userId = req.user?.userId ?? null;
    return this.testingService.getQuestion(testId, num, userId);
  }

  @Post(':testId/answer')
  @ApiOperation({ summary: 'Ответить на вопрос' })
  async submitAnswer(
    @Param('testId') testId: string,
    @Body() dto: SubmitAnswerDto,
    @Request() req: any,
  ) {
    const userId = req.user?.userId ?? null;
    const optionIds = dto.selectedOptionIds ||
      (dto.selectedOptionId ? [dto.selectedOptionId] : []);
    return this.testingService.submitAnswer(
      testId,
      dto.questionId,
      optionIds,
      userId,
    );
  }

  @Post(':testId/complete')
  @ApiOperation({ summary: 'Завершить тест' })
  async completeTest(@Param('testId') testId: string, @Request() req: any) {
    const userId = req.user?.userId ?? null;
    return this.testingService.completeTest(testId, userId);
  }

  @Get(':testId/results')
  @ApiOperation({ summary: 'Результаты теста' })
  async getResults(@Param('testId') testId: string, @Request() req: any) {
    const userId = req.user?.userId ?? null;
    return this.testingService.getResults(testId, userId);
  }
}
