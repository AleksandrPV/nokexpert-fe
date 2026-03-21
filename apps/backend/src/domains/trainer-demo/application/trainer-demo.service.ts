import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainerDemoRequestEntity } from '../infrastructure/entities/trainer-demo-request.entity';
import { CreateTrainerDemoRequestDto } from '../presentation/dto/create-trainer-demo-request.dto';

@Injectable()
export class TrainerDemoService {
  constructor(
    @InjectRepository(TrainerDemoRequestEntity)
    private readonly repository: Repository<TrainerDemoRequestEntity>,
  ) {}

  async create(
    dto: CreateTrainerDemoRequestDto,
  ): Promise<TrainerDemoRequestEntity> {
    const request = this.repository.create({
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
    });

    return this.repository.save(request);
  }

  async findAll(): Promise<TrainerDemoRequestEntity[]> {
    return this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
