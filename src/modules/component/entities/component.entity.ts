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
  OneToMany,
} from 'typeorm';
import { ComponentStatus } from './component-status.entity';
import { ComponentType } from './component-type.entity';
import { Delivery } from '../../delivery/entities/delivery.entity';
import { ComponentSubcomponent } from './component-subcomponent.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { WarehousePosition } from '../../warehouse/entities/warehouse-position.entity';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  name: string;

  @Column({ type: 'double precision', nullable: true })
  size: number;

  @Column({ nullable: true })
  productionDate: Date;

  @Column({ nullable: true })
  controlDate: Date;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: false })
  createdByUserId: number;

  @Column()
  modifiedByUserId: number;

  @Column({ nullable: true })
  scrappedAt?: Date;

  @ManyToOne(() => ComponentType)
  @JoinColumn({ name: 'componentTypeId' })
  componentType: ComponentType;

  @ManyToOne(() => ComponentStatus)
  @JoinColumn({ name: 'statusId' })
  status: ComponentStatus;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: 'deliveryId' })
  delivery: Delivery;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @ManyToOne(() => WarehousePosition)
  @JoinColumn({ name: 'warehousePositionId' })
  warehousePosition: WarehousePosition;

  @OneToMany(
    () => ComponentSubcomponent,
    (componentSubcomponent) => componentSubcomponent.component,
  )
  componentSubcomponents: ComponentSubcomponent[];
}
