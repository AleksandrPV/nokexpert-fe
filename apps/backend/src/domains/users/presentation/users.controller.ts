import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from '../application/users.service';
import { MailService } from '../../feedback/application/mail.service';
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
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

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
  async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.register(registerDto, this.mailService);
  }

  // Активация аккаунта по ссылке из письма менеджеру
  @Get('activate/:token')
  @Public()
  @ApiOperation({ summary: 'Активация аккаунта по токену' })
  async activateByToken(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.activateByToken(token);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Аккаунт активирован</title>
<style>body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f0fdf4}
.card{background:#fff;padding:48px;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.08);text-align:center;max-width:480px}
h1{color:#16a34a;margin-bottom:16px}p{color:#374151;font-size:18px;line-height:1.6}
.user{margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;color:#6b7280;font-size:14px}</style></head>
<body><div class="card"><h1>Аккаунт активирован!</h1>
<p>${user.firstName} ${user.lastName} теперь может войти в тренажёр НОК.</p>
<div class="user">Email: ${user.email}</div></div></body></html>`);
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
