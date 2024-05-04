import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { UserRoleService } from '../services/user-role.service';
import { AddRoleToUserDto, DeleteRoleFromUserDto } from '../dto/user-role/index';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('user-roles')
@ApiTags('user-roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  async addRoleToUser(@Body() addRoleToUserDto: AddRoleToUserDto) {
    const roleAssignment = await this.userRoleService.addRoleToUser(addRoleToUserDto);
    return {
      message: 'Rola została pomyślnie dodana do użytkownika.',
      data: roleAssignment
    };
  }

  @Delete()
  async deleteRoleFromUser(@Body() deleteRoleFromUserDto: DeleteRoleFromUserDto) {
    await this.userRoleService.deleteRoleFromUser(deleteRoleFromUserDto);
    return {
      message: 'Rola została pomyślnie usunięta z użytkownika.'
    };
  }

  @Get(':userId')
  async findAllRolesForUser(@Param('userId') userId: number) {
    const roles = await this.userRoleService.findAllRolesForUser(userId);
    return {
      message: 'Lista ról przypisanych do użytkownika.',
      data: roles
    };
  }
}
