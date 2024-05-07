import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Component } from './component.entity';
import { Subcomponent } from './subcomponent.entity';
import { SubcomponentStatus } from './subcomponent-status.entity';

@Entity()
export class ComponentSubcomponent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  modifiedByUserId: number;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Component, (component) => component.componentSubcomponents)
  @JoinColumn({ name: 'componentId' })
  component: Component;

  @ManyToOne(() => SubcomponentStatus)
  @JoinColumn({ name: 'statusId' })
  status: SubcomponentStatus;

  @ManyToOne(
    () => Subcomponent,
    (subcomponent) => subcomponent.componentSubcomponents,
  )
  @JoinColumn({ name: 'subcomponentId' })
  subcomponent: Subcomponent;
}
