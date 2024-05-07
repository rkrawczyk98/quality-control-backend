import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Component } from './component.entity';
import { Subcomponent } from './subcomponent.entity';

@Entity()
export class ComponentType {
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

  @OneToMany(() => Component, (component) => component.componentType)
  Components: Component[];

  @OneToMany(() => Subcomponent, (subcomponent) => subcomponent.componentType)
  Subcomponent: Subcomponent[];
}
