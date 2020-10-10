import { Module } from '@nestjs/common';
import { BusStopService } from './bus-stop.service';
import { BusStopController } from './bus-stop.controller';
import { PtxModule } from '../ptx/ptx.module';

@Module({
  imports: [PtxModule],
  providers: [BusStopService],
  controllers: [BusStopController]
})
export class BusStopModule { }
