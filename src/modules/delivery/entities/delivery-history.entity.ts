import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class DeliveryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryId: number; // Referencja do ID z tabeli Delivery

  @Column({ nullable: false })
  operationType: string; // 'INSERT', 'UPDATE', 'DELETE'

  @CreateDateColumn()
  operationTimestamp: Date;

  // Tutaj powtarzamy wszystkie pola z Delivery, które chcemy śledzić
  @Index()
  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  createdByUserId: number;

  @Index()
  @Column({ nullable: false })
  componentTypeId: number;

  @Column()
  creationDate: Date;

  @Column()
  lastModified: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  statusId: number;

  @Index()
  @Column({ nullable: true })
  customerId: number;

  @Column()
  deliveryDate: Date;
}
