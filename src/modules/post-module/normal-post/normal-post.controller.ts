import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { NormalPostService } from './normal-post.service';
import { NormalPost } from './entities/normal-post.entity';
import { CreateNormalPostDto } from './dto/create-normal-post.dto';
import { UpdateNormalPostDto } from './dto/update-normal-post.dto';

@Controller('normal-post')
export class NormalPostController {
  constructor(private readonly normalPostService: NormalPostService) {}

  @Post()
  create(@Body() createNormalPostDto: CreateNormalPostDto): Promise<NormalPost> {
    return this.normalPostService.create(createNormalPostDto);
  }

  @Get()
  findAll(): Promise<NormalPost[]> {
    return this.normalPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NormalPost> {
    return this.normalPostService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNormalPostDto: UpdateNormalPostDto): Promise<NormalPost> {
    const result = await this.normalPostService.update(+id, updateNormalPostDto);
    if (result && result.affected > 0) {
      return this.normalPostService.findOne(+id); 
    }
    throw new NotFoundException('Post not found');
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.normalPostService.remove(+id);
  }
}
