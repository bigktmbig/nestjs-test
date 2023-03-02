import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PostEntity} from "./entities/post-entity.entity";
import { constant } from "./constants";

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

    // handle map post data by type
    Object.entries(constant.POST_LIST).forEach(([key, value]) => {
      if (parseInt(key) === postEntity.type) {
        postEntity[value] = createPostDto[value];
      }
    });
    return this.postRepository.save(postEntity);
  }

  findAll(filter: object): Promise<PostEntity[]> {
    let whereObj = {};
    if (Object.keys(filter).length > 0) {
      whereObj = { where: filter};
    }
    return this.postRepository.find(whereObj);
  }

  findOne(id: number): Promise<PostEntity> {
    return this.postRepository.findOneBy({id: id});
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    // handle not map post data by type
    Object.entries(constant.POST_LIST).forEach(([key, value]) => {
      if (parseInt(key) !== updatePostDto.type) {
        delete updatePostDto[value];
      }
    });
    updatePostDto.id = id;
    const updatePost = await this.postRepository.preload(updatePostDto);
    return await this.postRepository.save(updatePost);
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }
}
