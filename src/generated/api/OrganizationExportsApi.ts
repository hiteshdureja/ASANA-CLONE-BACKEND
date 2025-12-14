import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateOrganizationExport201Response, CreateOrganizationExportRequest,  } from '../models';


@Injectable()
export abstract class OrganizationExportsApi {

  abstract createOrganizationExport(createOrganizationExportRequest: CreateOrganizationExportRequest, optPretty: boolean, optFields: Array<'created_at' | 'download_url' | 'organization' | 'organization.name' | 'state'>,  request: Request): CreateOrganizationExport201Response | Promise<CreateOrganizationExport201Response> | Observable<CreateOrganizationExport201Response>;


  abstract getOrganizationExport(organizationExportGid: string, optPretty: boolean, optFields: Array<'created_at' | 'download_url' | 'organization' | 'organization.name' | 'state'>,  request: Request): CreateOrganizationExport201Response | Promise<CreateOrganizationExport201Response> | Observable<CreateOrganizationExport201Response>;

} 