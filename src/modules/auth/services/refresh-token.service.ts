import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from '../../user/entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User) {
    const payload = {
      userId: user.id,
      username: user.username,
      roles: user.userRoles?.map(role => ({ id: role.role.id, name: role.role.name })),
    };
    
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: number, expiresIn: number) {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + expiresIn * 1000);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const token = crypto.randomBytes(32).toString('hex');

    const refreshToken = this.refreshTokenRepository.create({
      user,
      token, // Przypisz wygenerowany refresh token
      expiresIn: expiration,
    });

    await this.refreshTokenRepository.save(refreshToken);
    return refreshToken.token;
  }

  async removeRefreshToken(tokenValue: string) {
    await this.refreshTokenRepository.delete({ token: tokenValue });
  }

  async findTokenById(TokenId: number) {
    return this.refreshTokenRepository.findOne({ where: { id: TokenId } });
  }

  async findTokenByValue(tokenValue: string) {
    return this.refreshTokenRepository.findOne({
      where: { token: tokenValue },
      relations: ['user'],
    });
  }

  async removeAllRefreshTokens(userId: number) {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }
}
