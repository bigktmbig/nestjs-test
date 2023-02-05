import { Test, TestingModule } from '@nestjs/testing';
import { MediaPostController } from './media-post.controller';
import { MediaPostService } from './media-post.service';

describe('MediaPostController', () => {
  let controller: MediaPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaPostController],
      providers: [MediaPostService],
    }).compile();

    controller = module.get<MediaPostController>(MediaPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
