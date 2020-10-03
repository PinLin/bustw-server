import { Test, TestingModule } from '@nestjs/testing';
import { DataVersionService } from './data-version.service';
import { PtxModule } from '../ptx/ptx.module';

describe('DataVersionService', () => {
  let service: DataVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PtxModule],
      providers: [DataVersionService],
    }).compile();

    service = module.get<DataVersionService>(DataVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getDataVersion correctly', async () => {
    const result = await service.getDataVersion('Keelung');
    expect(result).toBeDefined();
    expect(result.versionId).toBeDefined();
    expect(result.updateTime).toBeDefined();
  });
});
