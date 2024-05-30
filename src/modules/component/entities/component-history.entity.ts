import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class ComponentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  componentId: number; // Referencja do ID z tabeli Component

  @Index()
  @Column({ nullable: false })
  operationType: string; // 'INSERT', 'UPDATE', 'DELETE'

  @CreateDateColumn()
  operationTimestamp: Date;

  // Tutaj powtarzamy wszystkie pola z Component, które chcemy śledzić
  @Index()
  @Column({ nullable: false })
  name: string;

  @Column({ type: 'double precision', nullable: true })
  size: number;

  @Column({ nullable: true })
  productionDate: Date;

  @Column({ nullable: true })
  controlDate: Date;

  @Column()
  creationDate: Date;

  @Column()
  lastModified: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: false })
  createdByUserId: number;

  @Column()
  modifiedByUserId: number;

  @Column({ nullable: true })
  scrappedAt: Date;
}
