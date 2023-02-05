import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NormalPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}