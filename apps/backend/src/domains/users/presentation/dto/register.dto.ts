import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsUUID,
  Matches,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../../shared/types/user.types';
import { APP_CONSTANTS } from '../../../../shared/constants/app.constants';

export class RegisterDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;

  @ApiPropertyOptional({
    description: 'Имя пользователя (логин)',
    example: 'user',
  })
  @IsOptional()
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  username?: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    minLength: APP_CONSTANTS.MIN_PASSWORD_LENGTH,
    maxLength: APP_CONSTANTS.MAX_PASSWORD_LENGTH,
  })
  @IsString()
  @MinLength(APP_CONSTANTS.MIN_PASSWORD_LENGTH, {
    message: `Пароль должен содержать минимум ${APP_CONSTANTS.MIN_PASSWORD_LENGTH} символов`,
  })
  @MaxLength(APP_CONSTANTS.MAX_PASSWORD_LENGTH, {
    message: `Пароль должен содержать максимум ${APP_CONSTANTS.MAX_PASSWORD_LENGTH} символов`,
  })
  password: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  first_name: string;

  @ApiPropertyOptional({
    description: 'Отчество пользователя',
    example: 'Иванович',
  })
  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  middle_name?: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
  })
  @IsString()
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  last_name: string;

  @ApiProperty({
    description: 'Телефон пользователя',
    example: '+79161234567',
    pattern: APP_CONSTANTS.PHONE_REGEX.source,
  })
  @IsString()
  @IsNotEmpty({ message: 'Телефон обязателен для заполнения' })
  @Matches(APP_CONSTANTS.PHONE_REGEX, {
    message: 'Номер телефона должен быть в формате +7XXXXXXXXXX',
  })
  phone: string;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole, { message: 'Недопустимая роль пользователя' })
  role: UserRole = UserRole.USER;

  @ApiPropertyOptional({
    description: 'Квалификации пользователя',
    example: ['Программист', 'Тестировщик'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualifications?: string[];

  @ApiPropertyOptional({
    description: 'ID центра оценки квалификации (для сотрудников центра)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'Некорректный UUID центра оценки' })
  qa_center_id?: string;
}
