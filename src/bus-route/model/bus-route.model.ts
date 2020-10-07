import { BusSubRoute } from './bus-sub-route.model';

export class BusRoute {
  id: string;
  nameZhTw?: string;
  nameEn?: string;
  departureStopNameZhTw?: string;
  departureStopNameEn?: string;
  destinationStopNameZhTw?: string;
  destinationStopNameEn?: string;
  city?: string;
  subRoutes: BusSubRoute[];
}
