import { Module } from '@nestjs/common';
import { BusStopService } from './bus-stop.service';
import { BusStopController } from './bus-stop.controller';

@Module({
  providers: [BusStopService],
  controllers: [BusStopController]
})
export class BusStopModule { }
