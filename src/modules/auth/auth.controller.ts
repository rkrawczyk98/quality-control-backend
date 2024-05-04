import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: TokenDto })
  async login(@Body() loginDto: LoginDto) {
    const userDto = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    const payload = {
      userId: userDto.id,
      username: userDto.username,
      roles: userDto.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
