import { Body, Controller, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExportsApi } from '../api';
import type { CreateGraphExport201Response, CreateGraphExportRequest, CreateResourceExport201Response, CreateResourceExportRequest,  } from '../models';

@Controller()
export class ExportsApiController {
  constructor(private readonly exportsApi: ExportsApi) {}

  @Post('/exports/graph')
  createGraphExport(@Body() createGraphExportRequest: CreateGraphExportRequest, @Req() request: Request): CreateGraphExport201Response | Promise<CreateGraphExport201Response> | Observable<CreateGraphExport201Response> {
    return this.exportsApi.createGraphExport(createGraphExportRequest, request);
  }

  @Post('/exports/resource')
  createResourceExport(@Body() createResourceExportRequest: CreateResourceExportRequest, @Req() request: Request): CreateResourceExport201Response | Promise<CreateResourceExport201Response> | Observable<CreateResourceExport201Response> {
    return this.exportsApi.createResourceExport(createResourceExportRequest, request);
  }

} 