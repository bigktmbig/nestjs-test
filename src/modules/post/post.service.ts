import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PostEntity} from "./entities/post-entity.entity";
import {POST_MEDIA, POST_PAID} from "./constants";

@Injectable()
export class PostService {

  constructor(
      @InjectRepository(PostEntity)
      private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const postEntity = new PostEntity();
    postEntity.title = createPostDto.title;
    postEntity.content = createPostDto.content;
    postEntity.type = createPostDto.type;
    if (createPostDto.type === POST_PAID) {
      postEntity.paidPost = createPostDto.paidPost;
    }
    if (createPostDto.type === POST_MEDIA) {
      postEntity.mediaPost = createPostDto.mediaPost;
    }

    return this.postRepository.save(postEntity);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<PostEntity> {
    return this.postRepository.findOne({
      where: {
        id: id
      },
      relations: {
        paidPost: true,
        mediaPost: true,
      }
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    if (updatePostDto.paidPost && updatePostDto.type != POST_PAID) {
      updatePostDto.paidPost = null;
    }
    if (updatePostDto.mediaPost && updatePostDto.type != POST_MEDIA) {
      updatePostDto.mediaPost = null;
    }
    updatePostDto.id = id;
    const updatePost = await this.postRepository.preload(updatePostDto);
    return await this.postRepository.save(updatePost);
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }
}
