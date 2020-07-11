import { Test, TestingModule } from '@nestjs/testing';
import { BusRouteService } from './bus-route.service';

describe('BusRouteService', () => {
  let service: BusRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusRouteService],
    }).compile();

    service = module.get<BusRouteService>(BusRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
