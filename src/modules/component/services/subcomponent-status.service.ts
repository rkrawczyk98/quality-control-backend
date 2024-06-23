import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcomponentStatus } from '../entities/subcomponent-status.entity';
import {
  CreateSubcomponentStatusDto,
  UpdateSubcomponentStatusDto,
} from '../dto/subcomponent-status';

@Injectable()
export class SubcomponentStatusService {
  constructor(
    @InjectRepository(SubcomponentStatus)
    private readonly subcomponentStatusRepository: Repository<SubcomponentStatus>,
  ) {}

  async create(
    createSubcomponentStatusDto: CreateSubcomponentStatusDto,
  ): Promise<SubcomponentStatus> {
    const subcomponentStatus = this.subcomponentStatusRepository.create(
      createSubcomponentStatusDto,
    );
    return this.subcomponentStatusRepository.save(subcomponentStatus);
  }

  async findAll(): Promise<SubcomponentStatus[]> {
    return this.subcomponentStatusRepository.find();
  }

  async findOne(id: number): Promise<SubcomponentStatus> {
    const subcomponentStatus =
      await this.subcomponentStatusRepository.findOneBy({ id });
    if (!subcomponentStatus) {
      throw new NotFoundException(
        `SubcomponentStatus with ID "${id}" not found`,
      );
    }
    return subcomponentStatus;
  }

  async update(
    id: number,
    updateSubcomponentStatusDto: UpdateSubcomponentStatusDto,
  ): Promise<SubcomponentStatus> {
    const subcomponentStatus = await this.subcomponentStatusRepository.preload({
      id: id,
      ...updateSubcomponentStatusDto,
    });

    if (!subcomponentStatus) {
      throw new NotFoundException(
        `SubcomponentStatus with ID "${id}" not found`,
      );
    }

    return this.subcomponentStatusRepository.save(subcomponentStatus);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subcomponentStatusRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `SubcomponentStatus with ID "${id}" not found`,
      );
    }
  }
}
