import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuditLogAPIApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class AuditLogAPIApiImpl extends AuditLogAPIApi {
  getAuditLogEvents(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
