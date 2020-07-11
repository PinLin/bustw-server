import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';

@Injectable()
export class PtxService {
  constructor(
    private readonly configService: ConfigService,
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
}
