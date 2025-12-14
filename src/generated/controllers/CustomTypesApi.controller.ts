import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomTypesApi } from '../api';
import { GetCustomType200Response, GetCustomTypes200Response,  } from '../models';

@Controller()
export class CustomTypesApiController {
  constructor(private readonly customTypesApi: CustomTypesApi) {}

  @Get('/custom_types/:custom_type_gid')
  getCustomType(@Param('customTypeGid') customTypeGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'name' | 'status_options' | 'status_options.color' | 'status_options.completion_state' | 'status_options.enabled' | 'status_options.name'>, @Req() request: Request): GetCustomType200Response | Promise<GetCustomType200Response> | Observable<GetCustomType200Response> {
    return this.customTypesApi.getCustomType(customTypeGid, optPretty, optFields, request);
  }

  @Get('/custom_types')
  getCustomTypes(@Query('project') project: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'name' | 'offset' | 'path' | 'status_options' | 'status_options.color' | 'status_options.completion_state' | 'status_options.enabled' | 'status_options.name' | 'uri'>, @Req() request: Request): GetCustomTypes200Response | Promise<GetCustomTypes200Response> | Observable<GetCustomTypes200Response> {
    return this.customTypesApi.getCustomTypes(project, optPretty, limit, offset, optFields, request);
  }

} 