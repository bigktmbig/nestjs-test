import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import {PaidPost} from "../entities/paid-post.entity";
import {MediaPost} from "../entities/media-post.entity";

export class UpdatePostDto extends PartialType(CreatePostDto) {
    id: number;
    title: string;
    content: string;
    type: number;
    paidPost?: PaidPost;
    mediaPost?: MediaPost;
}
