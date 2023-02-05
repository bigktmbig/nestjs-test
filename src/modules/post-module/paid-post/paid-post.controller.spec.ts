import { Test, TestingModule } from '@nestjs/testing';
import { PaidPostController } from './paid-post.controller';
import { PaidPostService } from './paid-post.service';

describe('PaidPostController', () => {
  let controller: PaidPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaidPostController],
      providers: [PaidPostService],
    }).compile();

    controller = module.get<PaidPostController>(PaidPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
