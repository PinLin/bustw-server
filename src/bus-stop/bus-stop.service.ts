import { Injectable } from '@nestjs/common';
import { PtxBusEstimatedTimeOfArrival } from 'src/ptx/model/ptx-bus-estimated-time-of-arrival.model';
import { PtxService } from '../ptx/ptx.service';
import { BusStop } from './model/bus-stop.model';
import { Bus } from './model/bus.model';

@Injectable()
export class BusStopService {
  constructor(
    private readonly ptxService: PtxService,
  ) { }

  async getBusStops(city: string) {
    const [
      ptxBusEstimatedTimeOfArrivalSet,
      ptxBusRealTimeNearStopSet,
    ] = await Promise.all([
      this.ptxService.fetchPtxBusEstimatedTimeOfArrivalSet(city),
      this.ptxService.fetchPtxBusRealTimeNearStopSet(city),
    ]);

    // 把 ptxBusRealTimeNearStopSet 整理成 busDict
    let busDict = {} as { [routeUID: string]: { [stopId: string]: Bus[] } };
    ptxBusRealTimeNearStopSet.map((ptxBusRealTimeNearStop) => {
      const routeId = ptxBusRealTimeNearStop.RouteUID;
      const stopId = ptxBusRealTimeNearStop.StopUID;

      if (!busDict[routeId]) {
        busDict[routeId] = {};
      }
      if (!busDict[routeId][stopId]) {
        busDict[routeId][stopId] = [];
      }

      busDict[routeId][stopId].push({
        plateNumber: ptxBusRealTimeNearStop.PlateNumb,
        status: ptxBusRealTimeNearStop.BusStatus ?? 0,
        approaching: ptxBusRealTimeNearStop.A2EventType,
      } as Bus);
    });

    return ptxBusEstimatedTimeOfArrivalSet.map((ptxBusEstimatedTimeOfArrival) => {
      const routeId = ptxBusEstimatedTimeOfArrival.RouteUID;
      const stopId = ptxBusEstimatedTimeOfArrival.StopUID;

      return {
        id: stopId,
        routeId: ptxBusEstimatedTimeOfArrival.RouteUID,
        status: ptxBusEstimatedTimeOfArrival.StopStatus,
        estimateTime: ptxBusEstimatedTimeOfArrival.EstimateTime ?? null,
        buses: busDict?.[routeId]?.[stopId] ?? [],
      } as BusStop;
    });
  }

  async getBusStopsByRoute(city: string, routeId: string) {
    const busStops = await this.getBusStops(city);

    return busStops.filter((busStop) => {
      return busStop.routeId == routeId;
    });
  }
}
