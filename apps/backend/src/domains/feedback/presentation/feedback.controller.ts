import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../../../shared/decorators/public.decorator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { MailService } from '../application/mail.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  private readonly logger = new Logger(FeedbackController.name);

  constructor(private readonly mailService: MailService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit feedback form' })
  @ApiResponse({ status: 200, description: 'Feedback sent successfully' })
  async create(@Body() dto: CreateFeedbackDto) {
    try {
      await this.mailService.sendFeedback(dto);
      return { success: true, message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.' };
    } catch (error) {
      this.logger.error('Failed to send feedback email', error);
      return { success: false, message: 'Ошибка отправки. Попробуйте позже или позвоните нам.' };
    }
  }
}
