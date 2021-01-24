import { Controller, Get, Param, ForbiddenException, BadGatewayException, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataVersionService } from './data-version.service';
import { DataVersion } from './model/data-version.model';

@Controller('data-version')
export class DataVersionController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly dataVersionService: DataVersionService,
  ) { }

  @Get(':city')
  async getDateVersion(@Param('city') city: string) {
    if (!city) {
      throw new ForbiddenException();
    }

    // 確認版本資訊是否存在於快取中
    const cacheDataVersion = JSON.parse(await this.cache.get(`${city}/DataVersion`) ?? null) as DataVersion;
    if (cacheDataVersion) {
      return cacheDataVersion;
    } else {
      // TODO: 在這裡刪除 BusRoutes 的快取是下下策
      await this.cache.del(`${city}/BusRoutes`);
    }

    // 取得版本資訊
    const dataVersion = await this.dataVersionService.getDataVersion(city);
    if (!dataVersion) {
      throw new BadGatewayException();
    }

    // 將版本資訊儲存到快取中
    this.cache.set(`${city}/DataVersion`, JSON.stringify(dataVersion), {
      ttl: 3600,
    });

    return dataVersion;
  }
}
