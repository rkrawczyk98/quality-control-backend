import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, DeleteDateColumn } from 'typeorm';
import { Delivery } from './../../delivery/entities/delivery.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Delivery, delivery => delivery.customer)
  deliveries: Delivery[];
}
