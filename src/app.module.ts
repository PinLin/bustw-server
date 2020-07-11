import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtxModule } from './ptx/ptx.module';

@Module({
  imports: [PtxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
