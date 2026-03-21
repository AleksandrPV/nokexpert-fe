import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainerDemoRequestDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Иванов',
  })
  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @ApiProperty({
    description: 'Номер телефона',
    example: '+79991234567',
  })
  @IsString()
  @IsNotEmpty({ message: 'Телефон не может быть пустым' })
  phone: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email: string;
}
