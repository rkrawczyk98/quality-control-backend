import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ComponentType } from './component-type.entity';
import { ComponentSubcomponent } from './component-subcomponent.entity';

@Entity()
export class Subcomponent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => ComponentType)
  @JoinColumn({ name: 'componentTypeId' })
  componentType: ComponentType;

  @OneToMany(
    () => ComponentSubcomponent,
    (componentSubcomponent) => componentSubcomponent.subcomponent,
  )
  componentSubcomponents: ComponentSubcomponent[];
}
