import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import { UserRole } from '../../../shared/types/user.types';

@Injectable()
export class AdminSeedService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async seedAdmin(): Promise<void> {
    // Проверяем, есть ли уже администраторы в системе
    const adminCount = await this.userRepository.countActiveByRole(
      UserRole.ADMIN,
    );

    if (adminCount === 0) {
      // Создаем первого администратора
      const adminPassword = await bcrypt.hash('admin123', 10);

      const adminUser = User.create(
        'admin@nok-expert.ru',
        adminPassword,
        'Системный',
        'Администратор',
        UserRole.ADMIN,
        undefined, // phone
        'admin', // username
        undefined, // middleName
        undefined, // qualifications
      );

      await this.userRepository.create(adminUser);

      console.log('✅ Первый администратор создан:');
      console.log('📧 Email: admin@nok-system.ru');
      console.log('🔑 Пароль: admin123');
      console.log('⚠️  ВАЖНО: Смените пароль после первого входа!');
    } else {
      console.log('ℹ️  Администраторы уже существуют в системе');
    }
  }
}
