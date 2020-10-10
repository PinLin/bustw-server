import { Test, TestingModule } from '@nestjs/testing';
import { PtxModule } from '../ptx/ptx.module';
import { BusStopService } from './bus-stop.service';

describe('BusStopService', () => {
  let service: BusStopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PtxModule],
      providers: [BusStopService],
    }).compile();

    service = module.get<BusStopService>(BusStopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getBusStops correctly', async () => {
    const busStops = await service.getBusStops('Keelung');
    expect(busStops).toBeDefined();
    expect(busStops.length).toBeGreaterThan(0);

    const busStop = busStops[0];
    expect(busStop.id).toBeDefined();
    expect(busStop.subRouteId).toBeDefined();
    expect(busStop.direction).toBeDefined();
    expect(busStop.status).toBeDefined();
    expect(busStop.estimateTime).toBeDefined();
  });
});
