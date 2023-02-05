import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NormalPost } from './entities/normal-post.entity';
import { NormalPostService } from './normal-post.service';
import { NormalPostController } from './normal-post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NormalPost])],
  controllers: [NormalPostController],
  providers: [NormalPostService]
})
export class NormalPostModule {}
