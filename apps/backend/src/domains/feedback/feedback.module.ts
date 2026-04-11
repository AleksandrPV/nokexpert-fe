import { Module } from '@nestjs/common';
import { FeedbackController } from './presentation/feedback.controller';
import { MailService } from './application/mail.service';

@Module({
  controllers: [FeedbackController],
  providers: [MailService],
  exports: [MailService],
})
export class FeedbackModule {}
