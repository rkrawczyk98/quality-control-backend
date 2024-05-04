import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne,JoinColumn, Index, DeleteDateColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
@Index(['permissionId', 'roleId'], { unique: true }) 
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    permissionId: number;

    @Index()
    @Column()
    roleId: number;

    @CreateDateColumn()
    creationDate: Date;
    
    @UpdateDateColumn()
    lastModified: Date;
    
    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => Role, role => role.rolePermissions)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @ManyToOne(() => Permission, permission => permission.rolePermissions)
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;
}
