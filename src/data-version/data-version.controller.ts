import { Controller, Get, Param, ForbiddenException, BadGatewayException } from '@nestjs/common';
import { DataVersionService } from './data-version.service';

@Controller('data-version')
export class DataVersionController {
  constructor(
    private readonly dataVersionService: DataVersionService,
  ) { }

  @Get(':city')
  async getDateVersion(@Param('city') city: string) {
    if (!city) {
      throw new ForbiddenException();
    }

    const dataVersion = await this.dataVersionService.getDataVersion(city);
    if (!dataVersion) {
      throw new BadGatewayException();
    }
    return dataVersion;
  }
}
