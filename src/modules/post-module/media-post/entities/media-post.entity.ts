import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    thumbnail: string;

    @Column()
    cover: string;
}