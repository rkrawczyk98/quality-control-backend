import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, DeleteDateColumn, BeforeInsert } from 'typeorm';
import { UserRole } from './user-role.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
