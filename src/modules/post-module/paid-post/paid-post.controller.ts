import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { PaidPostService } from './paid-post.service';
import { CreatePaidPostDto } from './dto/create-paid-post.dto';
import { UpdatePaidPostDto } from './dto/update-paid-post.dto';
import {PaidPost} from "./entities/paid-post.entity";

@Controller('paid-post')
export class PaidPostController {
  constructor(private readonly paidPostService: PaidPostService) {}

  @Post()
  create(@Body() createPaidPostDto: CreatePaidPostDto): Promise<PaidPost> {
    return this.paidPostService.create(createPaidPostDto);
  }

  @Get()
  findAll(): Promise<PaidPost[]> {
    return this.paidPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PaidPost> {
    return this.paidPostService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaidPostDto: UpdatePaidPostDto): Promise<PaidPost> {
    const result = await this.paidPostService.update(+id, updatePaidPostDto);
    if (result && result.affected > 0) {
      return this.paidPostService.findOne(+id);
    }
    throw new NotFoundException('Post not found');
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.paidPostService.remove(+id);
  }
}