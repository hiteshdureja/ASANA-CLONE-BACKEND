import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessRequestsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class AccessRequestsApiImpl extends AccessRequestsApi {
  approveAccessRequest(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  createAccessRequest(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getAccessRequests(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  rejectAccessRequest(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
