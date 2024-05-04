import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne,JoinColumn, Index, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
@Index(['userId', 'roleId'], { unique: true })
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    userId: number;

    @Index()
    @Column()
    roleId: number;

    @CreateDateColumn()
    creationDate: Date;
    
    @UpdateDateColumn()
    lastModified: Date;
    
    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Role, role => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    role: Role;
}
