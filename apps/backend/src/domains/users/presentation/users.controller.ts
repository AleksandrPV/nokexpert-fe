import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles, Public } from '../../../shared/decorators';
import {
  UserRole,
  UserSafeResponse,
  AuthResponse,
  AuthenticatedRequest,
} from '../../../shared/types/user.types';

@ApiTags('Пользователи и аутентификация')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ===== АУТЕНТИФИКАЦИОННЫЕ ЭНДПОИНТЫ =====

  @Post('forgot-password')
  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Запрос восстановления пароля' })
  async forgotPassword(@Body() body: { email: string }): Promise<{ message: string }> {
    await this.usersService.requestPasswordReset(body.email);
    return { message: 'Если аккаунт существует, инструкции отправлены на email' };
  }

  // Регистрация пользователя (публичный эндпоинт)
  @Post('register')
  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь зарегистрирован' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return await this.usersService.register(registerDto);
  }

  // Вход в систему (публичный эндпоинт)
  @Post('login')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return await this.usersService.login(loginDto);
  }

  // Получение профиля текущего пользователя
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить профиль пользователя' })
  @ApiResponse({ status: 200, description: 'Профиль получен' })
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.getProfile(req.user.userId);
  }

  // ===== УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ =====

  // Создание обычного пользователя (только администратор)
  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.createUser(createUserDto, req.user.role);
  }

  // Создание администратора (только администратор)
  @Post('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.createAdmin(createAdminDto, req.user.role);
  }

  // Получение всех пользователей (только администратор)
  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse[]> {
    return await this.usersService.findAll(req.user.role);
  }

  // Получение пользователя по ID
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findById(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.findById(id, req.user.userId, req.user.role);
  }

  // Поиск пользователя по email (только администратор)
  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findByEmail(
    @Param('email') email: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.findByEmail(email, req.user.role);
  }

  // Обновление пользователя
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.update(
      id,
      updateUserDto,
      req.user.userId,
      req.user.role,
    );
  }

  // Деактивация пользователя (только администратор)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deactivate(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.deactivate(id, req.user.role);
  }

  // Активация пользователя (только администратор)
  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async activate(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<UserSafeResponse> {
    return await this.usersService.activate(id, req.user.role);
  }

  // Смена пароля
  @Patch('change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    return await this.usersService.changePassword(
      req.user.userId,
      changePasswordDto,
      req.user.userId,
      req.user.role,
    );
  }

  // Смена пароля для конкретного пользователя (только администратор)
  @Patch(':id/change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async changeUserPassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    return await this.usersService.changePassword(
      id,
      changePasswordDto,
      req.user.userId,
      req.user.role,
    );
  }
}
