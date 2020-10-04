import { Injectable } from '@nestjs/common';
import { PtxService } from '../ptx/ptx.service';
import { DataVersion } from './model/data-version.model';

@Injectable()
export class DataVersionService {
  constructor(
    private readonly ptxService: PtxService,
  ) { }

  async getDataVersion(city: string) {
    const ptxDataVersion = await this.ptxService.fetchPtxDataVersion(city);
    return {
      versionId: ptxDataVersion.VersionID,
      updateTime: new Date(ptxDataVersion.UpdateTime),
    } as DataVersion;
  }
}
