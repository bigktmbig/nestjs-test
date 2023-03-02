import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {PostEntity} from "./post-entity.entity";

@Entity()
export class PaidPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    regularPrice: number;

    @Column({ default: 0 })
    salePrice: number;

    @OneToOne(() => PostEntity, (post_entity) => post_entity.paid_post, {
        onDelete: "CASCADE"
    })
    @JoinColumn([
        { name: "post_id", referencedColumnName: "id" }
    ])
    post_id: number;
}
