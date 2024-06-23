import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dto/customer/requests/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/requests/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['deliveries'] }); // Załaduj dostawy jeśli są potrzebne
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id); // Sprawdź, czy klient istnieje
    const updatedCustomer = this.customerRepository.merge(customer, updateCustomerDto);
    return this.customerRepository.save(updatedCustomer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.softDelete(customer);
  }
}
