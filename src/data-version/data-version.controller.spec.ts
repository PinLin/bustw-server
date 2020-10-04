import { Test, TestingModule } from '@nestjs/testing';
import { PtxModule } from '../ptx/ptx.module';
import { DataVersionController } from './data-version.controller';
import { DataVersionService } from './data-version.service';

describe('DataVersion Controller', () => {
  let controller: DataVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PtxModule],
      providers: [DataVersionService],
      controllers: [DataVersionController],
    }).compile();

    controller = module.get<DataVersionController>(DataVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
