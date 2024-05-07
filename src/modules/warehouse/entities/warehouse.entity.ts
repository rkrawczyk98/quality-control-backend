import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { WarehousePosition } from './warehouse-position.entity';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(
    () => WarehousePosition,
    (warehousePosition) => warehousePosition.warehouse,
  )
  positions: WarehousePosition[];
}
