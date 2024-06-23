import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcomponent } from '../entities/subcomponent.entity';
import {
  CreateSubcomponentDto,
  UpdateSubcomponentDto,
} from '../dto/subcomponent';

@Injectable()
export class SubcomponentService {
  constructor(
    @InjectRepository(Subcomponent)
    private readonly subcomponentRepository: Repository<Subcomponent>,
  ) {}

  async create(
    createSubcomponentDto: CreateSubcomponentDto,
  ): Promise<Subcomponent> {
    const subcomponent = this.subcomponentRepository.create({
      ...createSubcomponentDto,
      componentType: { id: createSubcomponentDto.componentTypeId },
    });
    return this.subcomponentRepository.save(subcomponent);
  }

  async findAll(): Promise<Subcomponent[]> {
    return this.subcomponentRepository.find({ relations: ['componentType'] });
  }

  async findOne(id: number): Promise<Subcomponent> {
    const subcomponent = await this.subcomponentRepository.findOneBy({ id });
    if (!subcomponent) {
      throw new NotFoundException(`Subcomponent with ID "${id}" not found`);
    }
    return subcomponent;
  }

  async update(
    id: number,
    updateSubcomponentDto: UpdateSubcomponentDto,
  ): Promise<Subcomponent> {
    const subcomponent = await this.subcomponentRepository.preload({
      id: id,
      ...updateSubcomponentDto,
      componentType: { id: updateSubcomponentDto.componentTypeId },
    });

    if (!subcomponent) {
      throw new NotFoundException(`Subcomponent with ID "${id}" not found`);
    }

    return this.subcomponentRepository.save(subcomponent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subcomponentRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subcomponent with ID "${id}" not found`);
    }
  }
}
