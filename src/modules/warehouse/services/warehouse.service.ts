import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { CreateWarehouseDto } from '../dto/warehouse/requests/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/warehouse/requests/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create(createWarehouseDto);
    return this.warehouseRepository.save(warehouse);
  }

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseRepository.find();
  }

  async findOne(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOneBy({ id });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return warehouse;
  }

  async update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    const warehouse = await this.findOne(id);
    const updated = Object.assign(warehouse, updateWarehouseDto);
    return this.warehouseRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.warehouseRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
  }
}
