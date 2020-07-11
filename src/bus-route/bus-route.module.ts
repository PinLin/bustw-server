import { Module } from '@nestjs/common';
import { BusRouteService } from './bus-route.service';
import { BusRouteController } from './bus-route.controller';
import { PtxModule } from '../ptx/ptx.module';

@Module({
  imports: [PtxModule],
  providers: [BusRouteService],
  controllers: [BusRouteController]
})
export class BusRouteModule { }
