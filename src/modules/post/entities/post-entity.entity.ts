import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    BeforeUpdate,
    BeforeInsert,
    AfterSoftRemove
} from 'typeorm';
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

    @OneToOne(() => PaidPost, (paid_post) => paid_post.post_id, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
        })
    paid_post: PaidPost;

    @OneToOne(() => MediaPost, (media_post) => media_post.post_id, {
        cascade: true,
        eager: true
    })
    media_post: MediaPost;


    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true})
    deleted_at: Date;

    @BeforeUpdate()
    updateDates() {
        this.updated_at = new Date();
    }

    @BeforeInsert()
    insertDates() {
        this.created_at = new Date();
    }

    @AfterSoftRemove()
    softRemoveDates() {
        this.deleted_at = new Date();
    }
}