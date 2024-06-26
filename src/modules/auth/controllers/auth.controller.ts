import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TokenDto } from '../dto/token.dto';
import { Response } from 'express';
import { RefreshTokenService } from '../services/refresh-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login User',
    description: 'Authenticates a user using their credentials and issues access and refresh tokens.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login credentials including username and password.'
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns access and refresh tokens along with the user ID.',
    type: TokenDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials provided.',
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const userDto = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!userDto) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
    const payload = {
      userId: userDto.id,
      username: userDto.username,
      roles: userDto.roles.map(role => ({ id: role.id, name: role.name })),
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.generateRefreshToken(userDto.id, 604800); // 7 dni w sekundach

    return res.status(HttpStatus.OK).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      user_id: userDto.id,
    });
  }


  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Refreshes the access token using a valid refresh token.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refresh_token: { type: 'string', description: 'Valid refresh token' },
      },
    },
    description: 'Payload containing a valid refresh token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: TokenDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired refresh token',
  })
  async refresh(@Body('refresh_token') tokenValue: string) {
    // Znajdź refresh token w bazie danych
    const refreshToken = await this.refreshTokenService.findTokenByValue(tokenValue);
    if (!refreshToken) {
      await this.refreshTokenService.removeRefreshToken(tokenValue);
      throw new UnauthorizedException('Invalid refresh token');
    }
  
    // Sprawdź czy refresh token nie wygasł
    if (Math.floor(refreshToken.expiresIn.getTime() / 1000) < Math.floor(Date.now() / 1000)) {
      await this.refreshTokenService.removeRefreshToken(tokenValue);
      throw new UnauthorizedException('Expired refresh token');
    }
  
    // Wygeneruj nowy access token
    const user = refreshToken.user;
    const accessToken = await this.refreshTokenService.generateAccessToken(user);
  
    // Wygeneruj nowy refresh token i usuń stary
    await this.refreshTokenService.removeRefreshToken(tokenValue);
    const newRefreshToken = await this.refreshTokenService.generateRefreshToken(user.id, 604800); // 7 dni w sekundach
  
    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
      user_id: user.id,
    };
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Log out user from all devices',
    description:
      'Logs out user from all devices by deleting all refresh tokens.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'number', description: 'ID of the user logging out' },
      },
    },
    description: 'Payload containing the user ID.',
  })
  @ApiResponse({ status: 200, description: 'User logged out from all devices' })
  async logout(@Body('user_id') userId: number) {
    await this.refreshTokenService.removeAllRefreshTokens(userId);
    return { message: 'User logged out from all devices' };
  }

  @Post('logout-single')
  @ApiOperation({
    summary: 'Log out from single device',
    description:
      'Logs out user from one device by deleting one specific refresh token.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
          description: 'Refresh token to be deleted',
        },
      },
    },
    description: 'Payload containing the refresh token to be removed.',
  })
  @ApiResponse({ status: 200, description: 'Logged out from one device' })
  async logoutSingleDevice(@Body('refresh_token') tokenValue: string) {
    await this.refreshTokenService.removeRefreshToken(tokenValue);
    return { message: 'Logged out from one device' };
  }
}
