import { Test, TestingModule } from '@nestjs/testing';
import { MediaPostService } from './media-post.service';

describe('MediaPostService', () => {
  let service: MediaPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaPostService],
    }).compile();

    service = module.get<MediaPostService>(MediaPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
