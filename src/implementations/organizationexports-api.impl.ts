import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrganizationExportsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class OrganizationExportsApiImpl extends OrganizationExportsApi {
  createOrganizationExport(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getOrganizationExport(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
