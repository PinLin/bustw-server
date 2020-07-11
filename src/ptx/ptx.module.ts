import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PtxService } from './ptx.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PtxService],
})
export class PtxModule { }
