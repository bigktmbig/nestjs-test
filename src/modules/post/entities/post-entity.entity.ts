import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {PaidPost} from "./paid-post.entity";
import {MediaPost} from "./media-post.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ default: 1 })
    type: number;  // 1: normalPost, 2: paidPost, 3: mediaPost

    @OneToOne(() => PaidPost, { cascade: true, eager: true})
    @JoinColumn()
    paidPost: PaidPost;

    @OneToOne(() => MediaPost, { cascade: true, eager: true})
    @JoinColumn()
    mediaPost: MediaPost;
}