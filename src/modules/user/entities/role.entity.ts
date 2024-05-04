import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany,Index, DeleteDateColumn } from 'typeorm';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Role {
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

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];
}
