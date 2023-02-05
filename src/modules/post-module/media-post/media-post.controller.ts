import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { MediaPostService } from './media-post.service';
import { CreateMediaPostDto } from './dto/create-media-post.dto';
import { UpdateMediaPostDto } from './dto/update-media-post.dto';
import {MediaPost} from "./entities/media-post.entity";

@Controller('media-post')
export class MediaPostController {
  constructor(private readonly mediaPostService: MediaPostService) {}

  @Post()
  create(@Body() createMediaPostDto: CreateMediaPostDto): Promise<MediaPost> {
    return this.mediaPostService.create(createMediaPostDto);
  }

  @Get()
  findAll(): Promise<MediaPost[]> {
    return this.mediaPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MediaPost> {
    return this.mediaPostService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMediaPostDto: UpdateMediaPostDto): Promise<MediaPost> {
    const result = await this.mediaPostService.update(+id, updateMediaPostDto);
    if (result && result.affected > 0) {
      return this.mediaPostService.findOne(+id);
    }
    throw new NotFoundException('Post not found');
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.mediaPostService.remove(+id);
  }
}
