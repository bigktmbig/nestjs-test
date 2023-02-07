import {Controller, Get, Post, Delete, Body, Patch, Param, Query} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './entities/post-entity.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query('filter') filter: object = {}): Promise<PostEntity[]> {
    return this.postService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return await this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(+id);
  }
}
