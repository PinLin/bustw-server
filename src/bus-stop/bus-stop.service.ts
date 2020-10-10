import { Injectable } from '@nestjs/common';
import { PtxBusEstimatedTimeOfArrival } from 'src/ptx/model/ptx-bus-estimated-time-of-arrival.model';
import { PtxService } from '../ptx/ptx.service';
import { BusStop } from './model/bus-stop.model';

@Injectable()
export class BusStopService {
  constructor(
    private readonly ptxService: PtxService,
  ) { }

  async getBusStops(city: string) {
    const ptxBusEstimatedTimeOfArrivalSet = await this.ptxService.fetchPtxBusEstimatedTimeOfArrivalSet(city);

    return ptxBusEstimatedTimeOfArrivalSet.map((ptxBusEstimatedTimeOfArrival) => ({
      id: ptxBusEstimatedTimeOfArrival.StopUID,
      routeId: ptxBusEstimatedTimeOfArrival.RouteUID,
      subRouteId: ptxBusEstimatedTimeOfArrival.SubRouteUID,
      direction: ptxBusEstimatedTimeOfArrival.Direction,
      sequence: ptxBusEstimatedTimeOfArrival.StopSequence,
      status: ptxBusEstimatedTimeOfArrival.StopStatus,
      estimateTime: ptxBusEstimatedTimeOfArrival.EstimateTime || null,
    } as BusStop));
  }

  async getBusStopsByRoute(city: string, routeId: string) {
    const busStops = await this.getBusStops(city);

    return busStops.filter((busStop) => {
      return busStop.routeId == routeId;
    });
  }
}
