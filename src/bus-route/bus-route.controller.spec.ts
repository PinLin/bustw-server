import { Test, TestingModule } from '@nestjs/testing';
import { PtxModule } from '../ptx/ptx.module';
import { BusRouteController } from './bus-route.controller';
import { BusRouteService } from './bus-route.service';

describe('BusRoute Controller', () => {
  let controller: BusRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PtxModule],
      providers: [BusRouteService],
      controllers: [BusRouteController],
    }).compile();

    controller = module.get<BusRouteController>(BusRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
