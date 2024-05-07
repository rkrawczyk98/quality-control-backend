import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @Column({ type: 'timestamp' })
  expiresIn: Date;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;
}
