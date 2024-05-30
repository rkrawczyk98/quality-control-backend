import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class ComponentSubcomponentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  componentSubcomponentId: number; // Identyfikator rekordu z ComponentSubcomponent

  @Column({ nullable: false })
  operationType: string; // 'INSERT', 'UPDATE', 'DELETE'

  @CreateDateColumn()
  operationTimestamp: Date;

  // Tutaj powtarzamy wszystkie pola z ComponentSubcomponent, które chcemy śledzić
  @Column({ nullable: false })
  modifiedByUserId: number;

  @CreateDateColumn()
  creationDate: Date;

  @Column()
  lastModified: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Index()
  @Column()
  componentId: number; // ID komponentu

  @Column()
  statusId: number; // ID statusu

  @Index()
  @Column()
  subcomponentId: number; // ID podkomponentu
}
