import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentSubcomponent } from '../entities/component-subcomponent.entity';
import {
  CreateComponentSubcomponentDto,
  UpdateComponentSubcomponentDto,
} from '../dto/component-subcomponent';
import { SubcomponentStatus } from '../entities';

@Injectable()
export class ComponentSubcomponentService {
  constructor(
    @InjectRepository(ComponentSubcomponent)
    private readonly componentSubcomponentRepository: Repository<ComponentSubcomponent>,
    @InjectRepository(SubcomponentStatus)
    private readonly subcomponentStatusRepository: Repository<SubcomponentStatus>,
  ) {}

  async create(
    createDto: CreateComponentSubcomponentDto,
  ): Promise<ComponentSubcomponent> {
    const entity = this.componentSubcomponentRepository.create(createDto);
    return this.componentSubcomponentRepository.save(entity);
  }

  async findAll(): Promise<ComponentSubcomponent[]> {
    return this.componentSubcomponentRepository.find({
      relations: ['component', 'subcomponent', 'status'],
      order: {id: 'ASC'},
    });
  }

  async findOne(id: number): Promise<ComponentSubcomponent> {
    const entity = await this.componentSubcomponentRepository.findOne({
      where: { id },
      relations: ['component', 'subcomponent', 'status'],
    });
    if (!entity) {
      throw new NotFoundException(
        `ComponentSubcomponent with ID "${id}" not found`,
      );
    }
    return entity;
  }

  async update(
    id: number,
    updateDto: UpdateComponentSubcomponentDto,
    userId: number,
  ): Promise<ComponentSubcomponent> {
    const existingEntity = await this.findOne(id);
    if (!existingEntity) {
      throw new NotFoundException(
        `ComponentSubcomponent with ID "${id}" not found`,
      );
    }
    if (updateDto.statusId) {
      const newStatus = await this.subcomponentStatusRepository.findOneBy({
        id: updateDto.statusId,
      });
      if (!newStatus) {
        throw new NotFoundException(
          `SubcomponentStatus with ID "${updateDto.statusId}" not found`,
        );
      }
      existingEntity.status = newStatus;
      existingEntity.modifiedByUserId = userId;
    }

    return this.componentSubcomponentRepository.save(existingEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.componentSubcomponentRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `ComponentSubcomponent with ID "${id}" not found`,
      );
    }
  }
}
