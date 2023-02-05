import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNormalPostDto } from './dto/create-normal-post.dto';
import { UpdateNormalPostDto } from './dto/update-normal-post.dto';
import { NormalPost } from './entities/normal-post.entity';

@Injectable()
export class NormalPostService {

  constructor(
    @InjectRepository(NormalPost)
    private readonly normalPostRepository: Repository<NormalPost>,
  ) {}

  create(createNormalPostDto: CreateNormalPostDto): Promise<NormalPost> {
    const normalPost = new NormalPost();
    normalPost.title = createNormalPostDto.title;
    normalPost.content = createNormalPostDto.content;

    return this.normalPostRepository.save(normalPost);
  }

  async findAll(): Promise<NormalPost[]> {
    return this.normalPostRepository.find();
  }

  findOne(id: number): Promise<NormalPost> {
    return this.normalPostRepository.findOneBy({ id: id });
  }

  async update(id: number, updateNormalPostDto: UpdateNormalPostDto) {
    return await this.normalPostRepository.update(id, updateNormalPostDto);
  }

  async remove(id: number) {
    await this.normalPostRepository.delete(id);
  }
}
