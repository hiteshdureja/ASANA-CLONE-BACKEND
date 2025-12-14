import { Body, Controller, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrganizationExportsApi } from '../api';
import type { CreateOrganizationExport201Response, CreateOrganizationExportRequest,  } from '../models';

@Controller()
export class OrganizationExportsApiController {
  constructor(private readonly organizationExportsApi: OrganizationExportsApi) {}

  @Post('/organization_exports')
  createOrganizationExport(@Body() createOrganizationExportRequest: CreateOrganizationExportRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'download_url' | 'organization' | 'organization.name' | 'state'>, @Req() request: Request): CreateOrganizationExport201Response | Promise<CreateOrganizationExport201Response> | Observable<CreateOrganizationExport201Response> {
    return this.organizationExportsApi.createOrganizationExport(createOrganizationExportRequest, optPretty, optFields, request);
  }

  @Get('/organization_exports/:organization_export_gid')
  getOrganizationExport(@Param('organizationExportGid') organizationExportGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'download_url' | 'organization' | 'organization.name' | 'state'>, @Req() request: Request): CreateOrganizationExport201Response | Promise<CreateOrganizationExport201Response> | Observable<CreateOrganizationExport201Response> {
    return this.organizationExportsApi.getOrganizationExport(organizationExportGid, optPretty, optFields, request);
  }

} 