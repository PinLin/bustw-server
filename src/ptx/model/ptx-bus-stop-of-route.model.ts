export class PtxBusStopOfRoute {
  RouteUID: string;
  SubRouteUID: string;
  Direction: number;
  City: string;
  Stops: {
    StopUID: string;
    StopName: {
      Zh_tw: string;
      En: string;
    };
    StopSequence: number;
  }[];
  VersionID: number;
}
