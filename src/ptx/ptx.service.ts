import { Injectable, Logger, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';
import { PtxDataVersion } from './model/ptx-data-version.model';
import { PtxBusRoute } from './model/ptx-bus-route.model';
import { PtxBusStopOfRoute } from './model/ptx-bus-stop-of-route.model';
import { PtxBusEstimatedTimeOfArrival } from './model/ptx-bus-estimated-time-of-arrival.model';

@Injectable()
export class PtxService {
  private readonly logger = new Logger(PtxService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  generateHeaders() {
    const appId = this.configService.get<string>('PTX_APP_ID');
    const appKey = this.configService.get<string>('PTX_APP_KEY');
    const date = new Date();

    const dateString = date.toUTCString();
    const hash = CryptoJS.HmacSHA1(`x-date: ${dateString}`, appKey);
    const hmac = CryptoJS.enc.Base64.stringify(hash);

    return {
      authorization: `hmac username="${appId}", algorithm="hmac-sha1", headers="x-date", signature="${hmac}"`,
      'x-date': dateString,
    };
  }

  getCityPath(city: string) {
    if (city === 'InterCity') {
      return 'InterCity';
    }
    return `City/${city}`
  }

  async fetchPtxDataVersion(city: string) {
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/DataVersion/${this.getCityPath(city)}?$format=JSON`;
    const headers = this.generateHeaders();

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      this.logger.log(`Fetched DataVersion of ${city}`);
      return response.data as PtxDataVersion;
    } catch (e) {
      this.logger.error(`Failed to fetch DataVersion of ${city}`);
    }
  }

  async fetchPtxBusRoutes(city: string) {
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/${this.getCityPath(city)}?$format=JSON`;
    const headers = this.generateHeaders();

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      this.logger.log(`Fetched BusRoute of ${city}`);
      return response.data as PtxBusRoute[];
    } catch (e) {
      this.logger.error(`Failed to fetch BusRoute of ${city}`);
    }
  }

  async fetchPtxBusStopsOfRoute(city: string) {
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/${this.getCityPath(city)}?$format=JSON`;
    const headers = this.generateHeaders();

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      this.logger.log(`Fetched BusStopOfRoute of ${city}`);
      return response.data as PtxBusStopOfRoute[];
    } catch (e) {
      this.logger.error(`Failed to fetch BusStopOfRoute of ${city}`);
    }
  }

  async fetchPtxBusEstimatedTimesOfArrival(city: string) {
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/${this.getCityPath(city)}?$format=JSON`;
    const headers = this.generateHeaders();

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      this.logger.log(`Fetched BusEstimatedTimeOfArrival of ${city}`);
      return response.data as PtxBusEstimatedTimeOfArrival[];
    } catch (e) {
      this.logger.error(`Failed to fetch BusEstimatedTimeOfArrival of ${city}`);
    }
  }
}
