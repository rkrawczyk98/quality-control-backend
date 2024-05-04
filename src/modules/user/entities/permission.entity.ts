import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, DeleteDateColumn } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({unique: true})
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
  rolePermissions: RolePermission[];
}
