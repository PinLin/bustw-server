import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtxModule } from './ptx/ptx.module';
import { DataVersionModule } from './data-version/data-version.module';
import { BusRouteModule } from './bus-route/bus-route.module';

@Module({
  imports: [PtxModule, DataVersionModule, BusRouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
