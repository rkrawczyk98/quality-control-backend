import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../entities/delivery.entity';
import {
  CreateDeliveryDto,
  UpdateDeliveryDto,
  DeleteDeliveryDto,
} from '../dto/delivery';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
    userId: number,
  ): Promise<Delivery> {
    // Ustawienie createdByUserId, number oraz domyślnego statusu dla dostawy (status musi istnieć w tabeli delivery_status)
    const newDelivery = this.deliveryRepository.create({
      ...createDeliveryDto,
      createdByUserId: userId,
      customer: { id: createDeliveryDto.customerId },
      status: { id: 1 },
      number: await this.generateDeliveryNumber(),
    });
    return this.deliveryRepository.save(newDelivery);
  }

  async updateDelivery(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepository.preload({
      id: id,
      ...updateDeliveryDto,
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    return this.deliveryRepository.save(delivery);
  }

  async deleteDelivery(id: number): Promise<void> {
    const result = await this.deliveryRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
  }

  async getAllDeliveries(): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      relations: ['status', 'customer'],
    });
  }

  async getDeliveryById(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: ['status', 'customer'],
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  // Pobranie ostatniego numeru dostawy i inkrementacja
  async generateDeliveryNumber(): Promise<string> {
    try {
      const lastDelivery = await this.deliveryRepository
        .createQueryBuilder('delivery')
        .withDeleted()
        .orderBy('delivery.id', 'DESC')
        .getOne();

      let nextNumber = 1;
      if (lastDelivery && lastDelivery.number) {
        nextNumber = parseInt(lastDelivery.number.replace(/\D/g, '')) + 1;
      }
      return `${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      throw new Error(
        'Error on method generateDeliveryNumber in DeliveryService fetching last delivery:' +
          error,
      );
    }
  }
}
