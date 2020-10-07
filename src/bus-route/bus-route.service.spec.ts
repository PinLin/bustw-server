import { Test, TestingModule } from '@nestjs/testing';
import { PtxModule } from '../ptx/ptx.module';
import { BusRouteService } from './bus-route.service';

describe('BusRouteService', () => {
  let service: BusRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PtxModule],
      providers: [BusRouteService],
    }).compile();

    service = module.get<BusRouteService>(BusRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getBusRoutes correctly', async () => {
    const busRoutes = await service.getBusRoutes('Keelung');
    expect(busRoutes).toBeDefined();
    expect(busRoutes.length).toBeGreaterThan(0);

    const busRoute = busRoutes[0];
    expect(busRoute.id).toBeDefined();
    expect(busRoute.nameZhTw).toBeDefined();
    expect(busRoute.nameEn).toBeDefined();
    expect(busRoute.departureStopNameZhTw).toBeDefined();
    expect(busRoute.departureStopNameEn).toBeDefined();
    expect(busRoute.destinationStopNameZhTw).toBeDefined();
    expect(busRoute.destinationStopNameEn).toBeDefined();
    expect(busRoute.city).toBeDefined();
    expect(busRoute.versionId).toBeDefined();
    expect(busRoute.subRoutes).toBeDefined();
    expect(busRoute.subRoutes.length).toBeGreaterThan(0);

    const subRoute = busRoute.subRoutes[0];
    expect(subRoute.id).toBeDefined();
    expect(subRoute.direction).toBeDefined();
    expect(subRoute.nameZhTw).toBeDefined();
    expect(subRoute.nameEn).toBeDefined();
    expect(subRoute.stops).toBeDefined();
    expect(subRoute.stops.length).toBeGreaterThan(0);

    const stop = subRoute.stops[0];
    expect(stop.id).toBeDefined();
    expect(stop.sequence).toBeDefined();
    expect(stop.nameZhTw).toBeDefined();
    expect(stop.nameEn).toBeDefined();
  });
});
