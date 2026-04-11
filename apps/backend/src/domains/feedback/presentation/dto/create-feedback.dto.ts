import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum FeedbackSubject {
  NOK_NOSTROY = 'nok-nostroy',
  NOK_NOPRIZ = 'nok-nopriz',
  NOK_OPB = 'nok-opb',
  CONSULTATION = 'consultation',
  DOCUMENTS = 'documents',
  PRICING = 'pricing',
  OTHER = 'other',
}

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(FeedbackSubject)
  @IsOptional()
  subject?: FeedbackSubject;

  @IsString()
  @IsOptional()
  message?: string;
}
