import { BusStop } from './bus-stop.model';

export class BusSubRoute {
  id: string;
  direction: number
  nameZhTw?: string;
  nameEn?: string;
  stops: BusStop[];
}
