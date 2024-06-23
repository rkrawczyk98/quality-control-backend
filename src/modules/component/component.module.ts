import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ComponentController,
  ComponentTypeController,
  ComponentStatusController,
  ComponentSubcomponentController,
  SubcomponentController,
  SubcomponentStatusController,
} from './controllers';
import {
  Component,
  ComponentType,
  ComponentStatus,
  ComponentSubcomponent,
  Subcomponent,
  SubcomponentStatus,
} from './entities';
import {
  ComponentService,
  ComponentTypeService,
  ComponentStatusService,
  ComponentSubcomponentService,
  SubcomponentService,
  SubcomponentStatusService,
} from './services';
import { UserRoleService, UserService } from '../user/services';
import { User, UserRole } from '../user/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Component,
      ComponentType,
      ComponentStatus,
      ComponentSubcomponent,
      Subcomponent,
      SubcomponentStatus,
      User,
      UserRole,
    ]),
  ],
  controllers: [
    ComponentController,
    ComponentTypeController,
    ComponentStatusController,
    ComponentSubcomponentController,
    SubcomponentController,
    SubcomponentStatusController,
  ],
  providers: [
    ComponentService,
    ComponentTypeService,
    ComponentStatusService,
    ComponentSubcomponentService,
    SubcomponentService,
    SubcomponentStatusService,
    UserService,
    UserRoleService,
  ],
  exports: [
    ComponentService,
    ComponentTypeService,
    ComponentStatusService,
    ComponentSubcomponentService,
    SubcomponentService,
    SubcomponentStatusService,
    UserService,
  ],
})
export class ComponentModule {}
