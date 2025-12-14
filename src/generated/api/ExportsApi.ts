import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateGraphExport201Response, CreateGraphExportRequest, CreateResourceExport201Response, CreateResourceExportRequest,  } from '../models';


@Injectable()
export abstract class ExportsApi {

  abstract createGraphExport(createGraphExportRequest: CreateGraphExportRequest,  request: Request): CreateGraphExport201Response | Promise<CreateGraphExport201Response> | Observable<CreateGraphExport201Response>;


  abstract createResourceExport(createResourceExportRequest: CreateResourceExportRequest,  request: Request): CreateResourceExport201Response | Promise<CreateResourceExport201Response> | Observable<CreateResourceExport201Response>;

} 