import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtxModule } from './ptx/ptx.module';
import { DataVersionModule } from './data-version/data-version.module';
import { BusRouteModule } from './bus-route/bus-route.module';
import { BusStopModule } from './bus-stop/bus-stop.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PtxModule,
    DataVersionModule,
    BusRouteModule,
    BusStopModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
