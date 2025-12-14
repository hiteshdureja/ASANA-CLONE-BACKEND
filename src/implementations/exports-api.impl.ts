import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExportsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class ExportsApiImpl extends ExportsApi {
  createGraphExport(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  createResourceExport(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
