import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../../../shared/decorators/public.decorator';
import { TrainerDemoService } from '../application/trainer-demo.service';
import { CreateTrainerDemoRequestDto } from './dto/create-trainer-demo-request.dto';

@ApiTags('Заявки на демо тренажера')
@Controller('trainer-demo-requests')
export class TrainerDemoController {
  constructor(private readonly trainerDemoService: TrainerDemoService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создать заявку на демо-версию тренажера' })
  @ApiResponse({
    status: 201,
    description: 'Заявка успешно создана',
  })
  async create(@Body() dto: CreateTrainerDemoRequestDto) {
    const request = await this.trainerDemoService.create(dto);
    return {
      success: true,
      message:
        'Заявка на демо-доступ успешно отправлена. Мы свяжемся с вами в ближайшее время.',
      id: request.id,
    };
  }
}
