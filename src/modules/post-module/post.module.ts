import { Module } from '@nestjs/common';
import { NormalPostModule } from './normal-post/normal-post.module';
import { PaidPostModule } from './paid-post/paid-post.module';
import { MediaPostModule } from './media-post/media-post.module';

@Module({
  imports: [NormalPostModule, PaidPostModule, MediaPostModule]
})
export class PostModule {}
