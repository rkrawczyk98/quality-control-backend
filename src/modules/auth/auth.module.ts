require('dotenv').config();
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module'
import { RefreshTokenService } from './services/refresh-token.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([RefreshToken,User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}