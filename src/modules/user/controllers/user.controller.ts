import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../dto/user/index';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { GetUser } from '../../../common/decorators/user.decorator';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponseDto,
    isArray: false,
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
    type: UserResponseDto,
    isArray: false,
  })
  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    const user = await this.userService.findByUserId(id);
    if (!user) {
      throw new NotFoundException(
        `Użytkownik o ID ${id} nie został znaleziony.`,
      );
    }
    return user;
  }

  @Get('/username/:username')
  async findUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(
        `Użytkownik o nazwie ${username} nie został znaleziony.`,
      );
    }
    return user;
  }

  @Patch('/change-password')
  @ApiOperation({ summary: 'Change already logged user password' })
  @ApiResponse({
    status: 200,
    description: 'Change already logged user password.',
    type: UserResponseDto,
    isArray: true,
  })
  @Patch(':id')
  updateUser(@GetUser() user: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.changePassword(user.userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
    type: UserResponseDto,
    isArray: false,
  })
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
