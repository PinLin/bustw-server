import { Test, TestingModule } from '@nestjs/testing';
import { PtxService } from './ptx.service';
import { ConfigService } from '@nestjs/config';

describe('PtxService', () => {
  let service: PtxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PtxService,
        ConfigService,
      ],
    }).compile();

    service = module.get<PtxService>(PtxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
