import { Test, TestingModule } from '@nestjs/testing';
import { DataVersionController } from './data-version.controller';

describe('DataVersion Controller', () => {
  let controller: DataVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataVersionController],
    }).compile();

    controller = module.get<DataVersionController>(DataVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
