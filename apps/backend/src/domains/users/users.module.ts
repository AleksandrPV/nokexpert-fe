import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './presentation/users.controller';
import { UsersService } from './application/users.service';
import { AdminSeedService } from './application/admin-seed.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserEntity } from './infrastructure/entities/user.entity';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret') || 'default-secret',
        signOptions: {
          expiresIn: (configService.get<string>('jwt.expiresIn') || '24h') as any,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AdminSeedService,
    JwtStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UsersService, AdminSeedService, JwtStrategy],
})
export class UsersModule {}
