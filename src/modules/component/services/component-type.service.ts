import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentType } from '../entities/component-type.entity';
import {
  CreateComponentTypeDto,
  UpdateComponentTypeDto,
} from '../dto/component-type';

@Injectable()
export class ComponentTypeService {
  constructor(
    @InjectRepository(ComponentType)
    private readonly componentTypeRepository: Repository<ComponentType>,
  ) {}

  async create(
    createComponentTypeDto: CreateComponentTypeDto,
  ): Promise<ComponentType> {
    const componentType = this.componentTypeRepository.create(
      createComponentTypeDto,
    );
    return this.componentTypeRepository.save(componentType);
  }

  async findAll(): Promise<ComponentType[]> {
    return this.componentTypeRepository.find();
  }

  async findOne(id: number): Promise<ComponentType> {
    const componentType = await this.componentTypeRepository.findOneBy({ id });
    if (!componentType) {
      throw new NotFoundException(`ComponentType with ID "${id}" not found`);
    }
    return componentType;
  }

  async update(
    id: number,
    updateComponentTypeDto: UpdateComponentTypeDto,
  ): Promise<ComponentType> {
    const componentType = await this.componentTypeRepository.preload({
      id: id,
      ...updateComponentTypeDto,
    });

    if (!componentType) {
      throw new NotFoundException(`ComponentType with ID "${id}" not found`);
    }

    return this.componentTypeRepository.save(componentType);
  }

  async remove(id: number): Promise<void> {
    const result = await this.componentTypeRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ComponentType with ID "${id}" not found`);
    }
  }
}
