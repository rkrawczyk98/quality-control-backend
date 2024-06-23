import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController, WarehousePositionController } from './controllers';
import { Warehouse, WarehousePosition } from './entities';
import { WarehouseService, WarehousePositionService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse, WarehousePosition])],
  controllers: [WarehouseController, WarehousePositionController],
  providers: [WarehouseService, WarehousePositionService],
  exports: [WarehouseService, WarehousePositionService],
})
export class WarehouseModule {}
