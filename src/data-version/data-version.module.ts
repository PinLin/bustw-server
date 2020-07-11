import { Module } from '@nestjs/common';
import { DataVersionService } from './data-version.service';
import { DataVersionController } from './data-version.controller';
import { PtxModule } from '../ptx/ptx.module';

@Module({
  imports: [PtxModule],
  providers: [DataVersionService],
  controllers: [DataVersionController],
})
export class DataVersionModule { }
