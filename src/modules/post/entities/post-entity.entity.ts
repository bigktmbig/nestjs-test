import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn } from 'typeorm';
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

    @OneToOne(() => PaidPost, (paidPost) => paidPost.post_id, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
        })
    paidPost: PaidPost;

    @OneToOne(() => MediaPost, (mediaPost) => mediaPost.post_id, {
        cascade: true,
        eager: true
    })
    mediaPost: MediaPost;
}