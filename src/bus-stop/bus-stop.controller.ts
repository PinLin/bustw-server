import { BadGatewayException, Controller, ForbiddenException, Get, Param } from '@nestjs/common';
import { BusStopService } from './bus-stop.service';

@Controller('stops')
export class BusStopController {
  constructor(
    private readonly busStopService: BusStopService,
  ) { }

  @Get(':city/:routeId')
  async getBusStops(@Param('city') city: string, @Param('routeId') routeId: string) {
    if (!city || !routeId) {
      throw new ForbiddenException();
    }

    const busStops = await this.busStopService.getBusStopsByRoute(city, routeId);
    if (!busStops) {
      throw new BadGatewayException();
    }
    return {
      stops: busStops,
    };
  }
}
