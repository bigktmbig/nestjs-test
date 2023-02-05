import { Injectable } from '@nestjs/common';
import { CreatePaidPostDto } from './dto/create-paid-post.dto';
import { UpdatePaidPostDto } from './dto/update-paid-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaidPost} from "./entities/paid-post.entity";

@Injectable()
export class PaidPostService {

  constructor(
      @InjectRepository(PaidPost)
      private readonly paidPostRepository: Repository<PaidPost>,
  ) {}

  create(createPaidPostDto: CreatePaidPostDto): Promise<PaidPost> {
    const paidPost = new PaidPost();
    paidPost.title = createPaidPostDto.title;
    paidPost.content = createPaidPostDto.content;
    paidPost.regularPrice = createPaidPostDto.regularPrice;
    paidPost.salePrice = createPaidPostDto.salePrice;

    return this.paidPostRepository.save(paidPost);
  }

  findAll(): Promise<PaidPost[]> {
    return this.paidPostRepository.find();
  }

  findOne(id: number): Promise<PaidPost> {
    return this.paidPostRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePaidPostDto: UpdatePaidPostDto) {
    return await this.paidPostRepository.update(id, updatePaidPostDto);
  }

  async remove(id: number) {
    await this.paidPostRepository.delete(id);
  }
}
