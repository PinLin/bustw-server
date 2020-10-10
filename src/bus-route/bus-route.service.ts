import { Injectable } from '@nestjs/common';
import { PtxService } from '../ptx/ptx.service';
import { BusRoute } from './model/bus-route.model';
import { BusStop } from './model/bus-stop.model';
import { BusSubRoute } from './model/bus-sub-route.model';

@Injectable()
export class BusRouteService {
  constructor(
    private readonly ptxService: PtxService,
  ) { }

  async getBusRoutes(city: string) {
    const [ptxBusRouteSet, ptxBusStopOfRouteSet] = await Promise.all([
      await this.ptxService.fetchPtxBusRouteSet(city),
      await this.ptxService.fetchPtxBusStopOfRouteSet(city),
    ]);

    // 把 ptxBusStopsOfRoute 整理成 busStopDict
    let busStopDict = {} as { [subRouteId: string]: { [direction: string]: BusStop[] } };
    ptxBusStopOfRouteSet.map((ptxBusStopOfRoute) => {
      const subRouteId = ptxBusStopOfRoute.SubRouteUID;
      const direction = ptxBusStopOfRoute.Direction;
      const stops = ptxBusStopOfRoute.Stops.map((ptxBusStop) => ({
        id: ptxBusStop.StopUID,
        sequence: ptxBusStop.StopSequence,
        nameZhTw: ptxBusStop.StopName.Zh_tw,
        nameEn: ptxBusStop.StopName.En,
      } as BusStop));

      if (busStopDict[subRouteId]) {
        busStopDict[subRouteId][direction] = stops;
      } else {
        busStopDict[subRouteId] = { [direction]: stops };
      }
    });

    return ptxBusRouteSet.map((ptxBusRoute) => ({
      id: ptxBusRoute.RouteUID,
      nameZhTw: ptxBusRoute.RouteName.Zh_tw,
      nameEn: ptxBusRoute.RouteName.En,
      departureStopNameZhTw: ptxBusRoute.DepartureStopNameZh,
      departureStopNameEn: ptxBusRoute.DepartureStopNameEn,
      destinationStopNameZhTw: ptxBusRoute.DestinationStopNameZh,
      destinationStopNameEn: ptxBusRoute.DestinationStopNameEn,
      city: ptxBusRoute.City || 'InterCity',
      subRoutes: ptxBusRoute.SubRoutes.map((ptxBusSubRoute) => ({
        id: ptxBusSubRoute.SubRouteUID,
        direction: ptxBusSubRoute.Direction,
        nameZhTw: ptxBusSubRoute.SubRouteName.Zh_tw,
        nameEn: ptxBusSubRoute.SubRouteName.En,
        stops: busStopDict[ptxBusSubRoute.SubRouteUID][ptxBusSubRoute.Direction],
      } as BusSubRoute)),
    } as BusRoute));
  }
}
