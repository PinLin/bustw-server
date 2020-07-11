import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PtxService } from './ptx.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
  ],
  providers: [PtxService],
  exports: [PtxService],
})
export class PtxModule { }
