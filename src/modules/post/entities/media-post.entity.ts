import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {PostEntity} from "./post-entity.entity";

@Entity()
export class MediaPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    thumbnail: string;

    @Column()
    cover: string;

    @OneToOne(() => PostEntity, (post_entity) => post_entity.media_post, {
        onDelete: "CASCADE"
    })
    @JoinColumn([
        { name: "post_id", referencedColumnName: "id" }
    ])
    post_id: number;
}