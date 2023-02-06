import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post-entity.entity";
import {MediaPost} from "./entities/media-post.entity";
import {PaidPost} from "./entities/paid-post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, MediaPost, PaidPost])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
