import { Test, TestingModule } from '@nestjs/testing';
import { NormalPostController } from './normal-post.controller';
import { NormalPostService } from './normal-post.service';

describe('NormalPostController', () => {
  let controller: NormalPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NormalPostController],
      providers: [NormalPostService],
    }).compile();

    controller = module.get<NormalPostController>(NormalPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
