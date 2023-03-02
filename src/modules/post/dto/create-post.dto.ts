import {MediaPost} from "../entities/media-post.entity";
import {PaidPost} from "../entities/paid-post.entity";

export class CreatePostDto {
    title: string;
    content: string;
    type: number;
    paid_post?: PaidPost;
    media_post?: MediaPost;
}
