import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaidPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    regularPrice: number;

    @Column({ default: 0 })
    salePrice: number;
}
