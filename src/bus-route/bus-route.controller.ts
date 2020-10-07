import { Controller, Get, Param, ForbiddenException, BadGatewayException } from '@nestjs/common';
import { BusRouteService } from './bus-route.service';

@Controller('route')
export class BusRouteController {
  constructor(
    private readonly busRouteService: BusRouteService,
  ) { }

  @Get(':city')
  async getBusRoutes(@Param('city') city: string) {
    if (!city) {
      throw new ForbiddenException();
    }

    const busRoutes = await this.busRouteService.getBusRoutes(city);
    if (!busRoutes) {
      throw new BadGatewayException();
    }
    return {
      routes: busRoutes,
    };
  }
}
