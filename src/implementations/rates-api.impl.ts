import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RatesApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class RatesApiImpl extends RatesApi {
  createRate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  deleteRate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getRate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getRates(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateRate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
