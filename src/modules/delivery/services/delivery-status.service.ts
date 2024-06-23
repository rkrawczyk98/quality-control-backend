import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryStatus } from '../entities/delivery-status.entity';
import {
  CreateDeliveryStatusDto,
  UpdateDeliveryStatusDto,
} from '../dto/delivery-status';

@Injectable()
export class DeliveryStatusService {
  constructor(
    @InjectRepository(DeliveryStatus)
    private deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

  async create(
    createDeliveryStatusDto: CreateDeliveryStatusDto,
  ): Promise<DeliveryStatus> {
    const status = this.deliveryStatusRepository.create(
      createDeliveryStatusDto,
    );
    return this.deliveryStatusRepository.save(status);
  }

  async findAll(): Promise<DeliveryStatus[]> {
    return this.deliveryStatusRepository.find();
  }

  async findOne(id: number): Promise<DeliveryStatus> {
    const status = await this.deliveryStatusRepository.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`DeliveryStatus with ID "${id}" not found`);
    }
    return status;
  }

  async update(
    id: number,
    updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ): Promise<DeliveryStatus> {
    const status = await this.findOne(id);
    const updatedStatus = this.deliveryStatusRepository.merge(
      status,
      updateDeliveryStatusDto,
    );
    return this.deliveryStatusRepository.save(updatedStatus);
  }

  async remove(id: number): Promise<void> {
    const status = await this.findOne(id);
    await this.deliveryStatusRepository.softDelete(status);
  }
}
