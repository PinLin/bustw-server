import { Test, TestingModule } from '@nestjs/testing';
import { PtxModule } from '../ptx/ptx.module';
import { BusStopController } from './bus-stop.controller';
import { BusStopService } from './bus-stop.service';

describe('BusStop Controller', () => {
  let controller: BusStopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PtxModule],
      providers: [BusStopService],
      controllers: [BusStopController],
    }).compile();

    controller = module.get<BusStopController>(BusStopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
