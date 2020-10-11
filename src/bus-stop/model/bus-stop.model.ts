import { Bus } from "./bus.model";

export class BusStop {
  id: string;
  routeId: string;
  status: number;
  estimateTime: number;
  buses: Bus[];
}
