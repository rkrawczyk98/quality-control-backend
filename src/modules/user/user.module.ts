import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController, RoleController, UserRoleController, /*PermissionController, RolePermissionController*/ } from './controllers';
import { User, Role, UserRole, /*Permission, RolePermission*/ } from './entities';
import { UserService, RoleService, UserRoleService, /*PermissionService, RolePermissionService*/ } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole, /*Permission, RolePermission*/])],
  controllers: [UserController, RoleController, UserRoleController, /*PermissionController, RolePermissionController*/],
  providers: [UserService, RoleService, UserRoleService, /*PermissionService, RolePermissionService*/],
  exports: [UserService, RoleService, UserRoleService, /*PermissionService, RolePermissionService*/],
})
export class UserModule {}