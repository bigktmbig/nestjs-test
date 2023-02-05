import { Module } from '@nestjs/common';
import { PaidPostService } from './paid-post.service';
import { PaidPostController } from './paid-post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaidPost} from "./entities/paid-post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PaidPost])],
  controllers: [PaidPostController],
  providers: [PaidPostService]
})
export class PaidPostModule {}
