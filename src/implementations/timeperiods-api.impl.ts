import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TimePeriodsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class TimePeriodsApiImpl extends TimePeriodsApi {
  getTimePeriod(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getTimePeriods(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
