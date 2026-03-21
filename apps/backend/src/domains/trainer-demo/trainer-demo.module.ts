import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerDemoRequestEntity } from './infrastructure/entities/trainer-demo-request.entity';
import { TrainerDemoService } from './application/trainer-demo.service';
import { TrainerDemoController } from './presentation/trainer-demo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerDemoRequestEntity])],
  controllers: [TrainerDemoController],
  providers: [TrainerDemoService],
  exports: [TrainerDemoService],
})
export class TrainerDemoModule {}
