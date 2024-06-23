import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentStatus } from '../entities/component-status.entity';
import {
  CreateComponentStatusDto,
  UpdateComponentStatusDto,
} from '../dto/component-status';

@Injectable()
export class ComponentStatusService {
  constructor(
    @InjectRepository(ComponentStatus)
    private readonly componentStatusRepository: Repository<ComponentStatus>,
  ) {}

  async create(
    createComponentStatusDto: CreateComponentStatusDto,
  ): Promise<ComponentStatus> {
    const componentStatus = this.componentStatusRepository.create(
      createComponentStatusDto,
    );
    return this.componentStatusRepository.save(componentStatus);
  }

  async findAll(): Promise<ComponentStatus[]> {
    return this.componentStatusRepository.find();
  }

  async findOne(id: number): Promise<ComponentStatus> {
    const componentStatus = await this.componentStatusRepository.findOneBy({
      id,
    });
    if (!componentStatus) {
      throw new NotFoundException(`ComponentStatus with ID "${id}" not found`);
    }
    return componentStatus;
  }

  async update(
    id: number,
    updateComponentStatusDto: UpdateComponentStatusDto,
  ): Promise<ComponentStatus> {
    const componentStatus = await this.componentStatusRepository.preload({
      id: id,
      ...updateComponentStatusDto,
    });

    if (!componentStatus) {
      throw new NotFoundException(`ComponentStatus with ID "${id}" not found`);
    }

    return this.componentStatusRepository.save(componentStatus);
  }

  async remove(id: number): Promise<void> {
    const result = await this.componentStatusRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ComponentStatus with ID "${id}" not found`);
    }
  }
}
