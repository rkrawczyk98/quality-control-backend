import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { DeliveryStatus } from './delivery-status.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Index()
  @Column({ unique: true })
  number: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  createdByUserId: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  componentTypeId: number;

  @IsNotEmpty()
  @Index()
  @Column()
  deliveryDate: Date;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @IsNotEmpty()
  @ManyToOne(() => DeliveryStatus)
  @JoinColumn({ name: 'statusId' })
  status: DeliveryStatus;

  @IsNotEmpty()
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
