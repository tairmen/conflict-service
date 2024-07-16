import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Conflict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  info: string;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}