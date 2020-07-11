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

    const data = await this.busRouteService.getBusRoutes(city);
    if (!data) {
      throw new BadGatewayException();
    }
    return data;
  }
}
