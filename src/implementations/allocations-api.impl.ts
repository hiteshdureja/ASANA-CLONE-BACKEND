import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AllocationsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class AllocationsApiImpl extends AllocationsApi {
  createAllocation(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  deleteAllocation(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getAllocation(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getAllocations(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateAllocation(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
