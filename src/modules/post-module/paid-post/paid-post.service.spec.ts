import { Test, TestingModule } from '@nestjs/testing';
import { PaidPostService } from './paid-post.service';

describe('PaidPostService', () => {
  let service: PaidPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaidPostService],
    }).compile();

    service = module.get<PaidPostService>(PaidPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
