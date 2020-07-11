import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtxModule } from './ptx/ptx.module';
import { DataVersionModule } from './data-version/data-version.module';

@Module({
  imports: [PtxModule, DataVersionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
