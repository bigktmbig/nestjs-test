import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    thumbnail: string;

    @Column()
    cover: string;
}