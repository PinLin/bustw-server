import { Injectable } from '@nestjs/common';
import { PtxService } from '../ptx/ptx.service';
import { BusRoute } from './model/bus-route.model';
import { BusSubRoute } from './model/bus-sub-route.model';

@Injectable()
export class BusRouteService {
  constructor(
    private readonly ptxService: PtxService,
  ) { }

  async getBusRoutes(city: string) {
    const ptxBusRoutes = await this.ptxService.fetchPtxBusRoutes(city);
    return ptxBusRoutes.map((ptxBusRoute) => ({
      id: ptxBusRoute.RouteUID,
      nameZhTw: ptxBusRoute.RouteName.Zh_tw,
      nameEn: ptxBusRoute.RouteName.En,
      departureStopNameZhTw: ptxBusRoute.DepartureStopNameZh,
      departureStopNameEn: ptxBusRoute.DepartureStopNameEn,
      destinationStopNameZhTw: ptxBusRoute.DestinationStopNameZh,
      destinationStopNameEn: ptxBusRoute.DestinationStopNameEn,
      city: ptxBusRoute.City || 'InterCity',
      versionId: ptxBusRoute.VersionID,
      subRoutes: ptxBusRoute.SubRoutes.map((ptxBusSubRoute) => ({
        id: ptxBusSubRoute.SubRouteUID,
        direction: ptxBusSubRoute.Direction,
        nameZhTw: ptxBusSubRoute.SubRouteName.Zh_tw,
        nameEn: ptxBusSubRoute.SubRouteName.En,
      } as BusSubRoute)),
    } as BusRoute));
  }
}
