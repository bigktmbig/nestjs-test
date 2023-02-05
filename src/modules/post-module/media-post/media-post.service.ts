import { Injectable } from '@nestjs/common';
import { CreateMediaPostDto } from './dto/create-media-post.dto';
import { UpdateMediaPostDto } from './dto/update-media-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MediaPost} from "./entities/media-post.entity";

@Injectable()
export class MediaPostService {

  constructor(
      @InjectRepository(MediaPost)
      private readonly mediaPostRepository: Repository<MediaPost>,
  ) {}

  create(createMediaPostDto: CreateMediaPostDto): Promise<MediaPost> {
    const mediaPost = new MediaPost();
    mediaPost.title = createMediaPostDto.title;
    mediaPost.content = createMediaPostDto.content;
    mediaPost.thumbnail = createMediaPostDto.thumbnail;
    mediaPost.cover = createMediaPostDto.cover;

    return this.mediaPostRepository.save(mediaPost);
  }

  findAll(): Promise<MediaPost[]> {
    return this.mediaPostRepository.find();
  }

  findOne(id: number): Promise<MediaPost> {
    return this.mediaPostRepository.findOneBy({ id: id });
  }

  async update(id: number, updateMediaPostDto: UpdateMediaPostDto) {
    return await this.mediaPostRepository.update(id, updateMediaPostDto);
  }

  async remove(id: number) {
    await this.mediaPostRepository.delete(id);
  }
}
