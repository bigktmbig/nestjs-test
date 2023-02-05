import { Test, TestingModule } from '@nestjs/testing';
import { NormalPostService } from './normal-post.service';

describe('NormalPostService', () => {
  let service: NormalPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NormalPostService],
    }).compile();

    service = module.get<NormalPostService>(NormalPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
