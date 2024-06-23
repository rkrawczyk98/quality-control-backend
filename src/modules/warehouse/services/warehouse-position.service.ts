import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehousePositionDto, UpdateWarehousePositionDto } from '../dto/warehouse-position';
import { Warehouse, WarehousePosition } from '../entities';

@Injectable()
export class WarehousePositionService {
  constructor(
    @InjectRepository(WarehousePosition)
    private readonly warehousePositionRepository: Repository<WarehousePosition>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(createWarehousePositionDto: CreateWarehousePositionDto): Promise<WarehousePosition> {
    const warehousePosition = this.warehousePositionRepository.create(createWarehousePositionDto);
    const warehouse = await this.warehouseRepository.findOneBy({ id: createWarehousePositionDto.warehouseId });
        if (!warehouse) {
            throw new NotFoundException(`Magazyn o ID ${createWarehousePositionDto.warehouseId} nie został znaleziony.`);
        }
    return this.warehousePositionRepository.save(warehousePosition);
  }

  async findAll(): Promise<WarehousePosition[]> {
    return this.warehousePositionRepository.find();
  }

  async findOne(id: number): Promise<WarehousePosition> {
    const warehousePosition = await this.warehousePositionRepository.findOneBy({ id });
    if (!warehousePosition) {
      throw new NotFoundException(`WarehousePosition with ID "${id}" not found`);
    }
    return warehousePosition;
  }

  async update(id: number, updateWarehousePositionDto: UpdateWarehousePositionDto): Promise<WarehousePosition> {
    const warehousePosition = await this.findOne(id); // Używa findOne, aby sprawdzić, czy pozycja magazynowa istnieje
    const warehouse = await this.warehouseRepository.findOneBy({ id: updateWarehousePositionDto.warehouseId });
    if (!warehouse) {
        throw new NotFoundException(`Magazyn o ID ${updateWarehousePositionDto.warehouseId} nie został znaleziony.`);
    }
    const updatedWarehousePosition = this.warehousePositionRepository.merge(warehousePosition, updateWarehousePositionDto);
    return this.warehousePositionRepository.save(updatedWarehousePosition);
  }

  async remove(id: number): Promise<void> {
    const warehousePosition = await this.findOne(id);
    await this.warehousePositionRepository.softDelete(warehousePosition);
  }
}
