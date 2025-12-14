import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TimeTrackingEntriesApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class TimeTrackingEntriesApiImpl extends TimeTrackingEntriesApi {
  createTimeTrackingEntry(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  deleteTimeTrackingEntry(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getTimeTrackingEntries(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getTimeTrackingEntriesForTask(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getTimeTrackingEntry(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateTimeTrackingEntry(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
