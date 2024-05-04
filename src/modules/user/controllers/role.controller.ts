import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  import { RoleService } from '../services/role.service';
  import { CreateRoleDto } from '../dto/role/requests/create-role.dto';
  import { UpdateRoleDto } from '../dto/role/requests/update-role.dto';
  import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
  
  @ApiTags('role')
  @ApiBearerAuth()
  @Controller('role')
  @UseGuards(JwtAuthGuard)
  export class RoleController {
    constructor(private readonly roleService: RoleService) {}
  
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'Role created successfully.' })
    @Post()
    createRole(@Body() createRoleDto: CreateRoleDto) {
      return this.roleService.createRole(createRoleDto);
    }
  
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'Return all roles.' })
    @Get()
    findAllRoles() {
      return this.roleService.findAllRoles();
    }
  
    @ApiOperation({ summary: 'Update a role' })
    @ApiResponse({ status: 200, description: 'Role updated successfully.' })
    @ApiParam({ name: 'id', type: 'number' })
    @Patch(':id')
    updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
      return this.roleService.updateRole(id, updateRoleDto);
    }
  
    @ApiOperation({ summary: 'Delete a role' })
    @ApiResponse({ status: 204, description: 'Role deleted successfully.' })
    @ApiParam({ name: 'id', type: 'number' })
    @Delete(':id')
    deleteRole(@Param('id') id: number) {
      return this.roleService.deleteRole(id);
    }
  }
  