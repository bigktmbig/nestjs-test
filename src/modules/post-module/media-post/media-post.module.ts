import { Module } from '@nestjs/common';
import { MediaPostService } from './media-post.service';
import { MediaPostController } from './media-post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MediaPost} from "./entities/media-post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MediaPost])],
  controllers: [MediaPostController],
  providers: [MediaPostService]
})
export class MediaPostModule {}
