import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { CreateAdminDto } from '../presentation/dto/create-admin.dto';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { ChangePasswordDto } from '../presentation/dto/change-password.dto';
import { LoginDto } from '../presentation/dto/login.dto';
import { RegisterDto } from '../presentation/dto/register.dto';
import {
  UserRole,
  UserSafeResponse,
  AuthResponse,
  JwtPayload,
} from '../../../shared/types/user.types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Создание обычного пользователя (только администратор)
  async createUser(
    createUserDto: CreateUserDto,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can create users');
    }

    // Проверка уникальности email
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Хеширование пароля
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    // Создание доменной сущности
    const user = User.create(
      createUserDto.email,
      passwordHash,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.role,
      createUserDto.phone,
      createUserDto.username,
      createUserDto.middleName,
      createUserDto.qualifications,
    );

    // Сохранение через репозиторий
    const savedUser = await this.userRepository.create(user);

    // Логирование критической операции
    this.logger.log(`User created: ${savedUser.email} by admin`);

    return savedUser.toSafeResponse();
  }

  // Создание администратора (только администратор)
  async createAdmin(
    createAdminDto: CreateAdminDto,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Only administrators can create other administrators',
      );
    }

    // Проверка уникальности email
    const existingUser = await this.userRepository.findByEmail(
      createAdminDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Хеширование пароля
    const passwordHash = await bcrypt.hash(createAdminDto.password, 10);

    // Создание доменной сущности
    const user = User.create(
      createAdminDto.email,
      passwordHash,
      createAdminDto.firstName,
      createAdminDto.lastName,
      UserRole.ADMIN,
      createAdminDto.phone,
      createAdminDto.username,
      createAdminDto.middleName,
    );

    // Сохранение через репозиторий
    const savedUser = await this.userRepository.create(user);

    // Логирование критической операции
    this.logger.log(`Admin created: ${savedUser.email} by admin`);

    return savedUser.toSafeResponse();
  }

  // Получение всех пользователей (только администратор)
  async findAll(currentUserRole: UserRole): Promise<UserSafeResponse[]> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can view all users');
    }

    const users = await this.userRepository.findAll();
    return users.map((user) => user.toSafeResponse());
  }

  // Получение профиля текущего пользователя
  async getProfile(currentUserId: string): Promise<UserSafeResponse> {
    const user = await this.userRepository.findById(currentUserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toSafeResponse();
  }

  // Получение пользователя по ID
  async findById(
    id: string,
    currentUserId: string,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Проверка прав доступа
    if (currentUserRole !== UserRole.ADMIN && currentUserId !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }

    return user.toSafeResponse();
  }

  // Поиск пользователя по email (только администратор)
  async findByEmail(
    email: string,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can search by email');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toSafeResponse();
  }

  // Обновление пользователя
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUserId: string,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Проверка прав доступа
    if (currentUserRole !== UserRole.ADMIN && currentUserId !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }

    // Проверка уникальности email при обновлении
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Создание обновленной доменной сущности
    const updatedUser = user.updateProfile(
      updateUserDto.firstName,
      updateUserDto.middleName,
      updateUserDto.lastName,
      updateUserDto.phone,
      updateUserDto.username,
      updateUserDto.qualifications,
    );

    // Обновление через репозиторий
    const savedUser = await this.userRepository.update(updatedUser);

    return savedUser.toSafeResponse();
  }

  // Деактивация пользователя (только администратор)
  async deactivate(
    id: string,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can deactivate users');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Проверка, что это не последний администратор
    if (user.isAdmin()) {
      const adminCount = await this.userRepository.countActiveByRole(
        UserRole.ADMIN,
      );
      if (adminCount <= 1) {
        throw new BadRequestException(
          'Cannot deactivate the last administrator',
        );
      }
    }

    // Создание деактивированной доменной сущности
    const deactivatedUser = user.deactivate();

    // Обновление через репозиторий
    const savedUser = await this.userRepository.update(deactivatedUser);

    // Логирование критической операции
    this.logger.log(`User deactivated: ${user.email} by admin`);

    return savedUser.toSafeResponse();
  }

  // Активация пользователя (только администратор)
  async activate(
    id: string,
    currentUserRole: UserRole,
  ): Promise<UserSafeResponse> {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can activate users');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Создание активированной доменной сущности
    const activatedUser = user.activate();

    // Обновление через репозиторий
    const savedUser = await this.userRepository.update(activatedUser);

    return savedUser.toSafeResponse();
  }

  // Смена пароля
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
    currentUserId: string,
    currentUserRole: UserRole,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Проверка прав доступа
    if (currentUserRole !== UserRole.ADMIN && currentUserId !== id) {
      throw new ForbiddenException('You can only change your own password');
    }

    // Проверка текущего пароля (если пользователь меняет свой пароль)
    if (currentUserRole !== UserRole.ADMIN) {
      const isPasswordValid = await bcrypt.compare(
        changePasswordDto.currentPassword,
        user.passwordHash,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }
    }

    // Хеширование нового пароля
    const newPasswordHash = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );

    // Создание обновленной доменной сущности
    const updatedUser = user.changePassword(newPasswordHash);

    // Обновление через репозиторий
    await this.userRepository.update(updatedUser);

    return { message: 'Password changed successfully' };
  }

  // Метод для проверки существования пользователя (для других сервисов)
  async exists(id: string): Promise<boolean> {
    return await this.userRepository.exists(id);
  }

  // Метод для получения количества администраторов
  async getAdminCount(): Promise<number> {
    return await this.userRepository.countActiveByRole(UserRole.ADMIN);
  }

  // Методы для Auth модуля (без проверки прав доступа)

  // Поиск пользователя по email для аутентификации
  async findByEmailForAuth(email: string): Promise<UserSafeResponse | null> {
    const user = await this.userRepository.findByEmail(email);
    return user ? user.toSafeResponse() : null;
  }

  // Создание пользователя из Auth модуля (регистрация)
  async createUserFromAuth(
    registerDto: RegisterDto,
  ): Promise<UserSafeResponse> {
    // Проверка уникальности email
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Хеширование пароля
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    // Создание доменной сущности
    const user = User.create(
      registerDto.email,
      passwordHash,
      registerDto.first_name,
      registerDto.last_name,
      registerDto.role || UserRole.USER,
      registerDto.phone,
      registerDto.username,
      registerDto.middle_name,
      registerDto.qualifications,
      registerDto.qa_center_id,
    );

    // Сохранение через репозиторий
    const savedUser = await this.userRepository.create(user);

    return savedUser.toSafeResponse();
  }

  // ===== АУТЕНТИФИКАЦИОННЫЕ МЕТОДЫ =====

  // Валидация пользователя для входа
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserSafeResponse | null> {
    const user = await this.userRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user.toSafeResponse();
    }
    return null;
  }

  // Вход в систему
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  // Регистрация пользователя
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Создание пользователя
    await this.createUserFromAuth(registerDto);

    // Автоматический вход после регистрации
    return this.login({
      email: registerDto.email,
      password: registerDto.password,
    });
  }
}
