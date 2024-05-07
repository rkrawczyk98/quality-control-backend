import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class DeliveryStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
