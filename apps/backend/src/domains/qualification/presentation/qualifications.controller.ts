import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { QualificationService } from '../application/qualification.service';

@ApiTags('Qualifications')
@Controller('qualifications')
export class QualificationsController {
  constructor(private readonly qualificationService: QualificationService) {}

  @Get('councils')
  @ApiOperation({ summary: 'Получить список СПК' })
  async getCouncils() {
    const councils = await this.qualificationService.findAllCouncils();
    return councils.map((c) => ({
      councilId: c.councilId,
      code: c.code,
      title: c.title,
      description: c.description,
    }));
  }

  @Get()
  @ApiOperation({ summary: 'Получить квалификации (с фильтром по СПК)' })
  @ApiQuery({ name: 'councilId', required: false })
  @ApiQuery({ name: 'councilCode', required: false })
  async getQualifications(
    @Query('councilId') councilId?: string,
    @Query('councilCode') councilCode?: string,
  ) {
    let resolvedCouncilId = councilId;

    // Если передан councilCode вместо councilId — найти совет по коду
    if (!resolvedCouncilId && councilCode) {
      const council = await this.qualificationService.findCouncilByCode(councilCode);
      resolvedCouncilId = council?.councilId;
    }

    const qualifications =
      await this.qualificationService.findQualificationsByCouncil(resolvedCouncilId);
    return qualifications.map((q) => ({
      profQualId: q.profQualId,
      title: q.title,
      code: q.code,
      level: q.level,
      councilId: q.councilId,
      questionCount: q.questionCount,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить квалификацию по ID' })
  async getQualification(@Param('id') id: string) {
    const q = await this.qualificationService.findQualificationById(id);
    if (!q) return null;
    return {
      profQualId: q.profQualId,
      title: q.title,
      code: q.code,
      level: q.level,
      councilId: q.councilId,
      questionCount: q.questionCount,
    };
  }
}
