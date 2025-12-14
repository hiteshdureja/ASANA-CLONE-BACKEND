import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RatesApi } from '../api';
import type { ApproveAccessRequest200Response, CreateRate201Response, CreateRateRequest, GetRates200Response, UpdateRateRequest,  } from '../models';

@Controller()
export class RatesApiController {
  constructor(private readonly ratesApi: RatesApi) {}

  @Post('/rates')
  createRate(@Body() createRateRequest: CreateRateRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_by' | 'created_by.name' | 'currency_code' | 'parent' | 'parent.name' | 'rate' | 'resource' | 'resource.name'>, @Req() request: Request): CreateRate201Response | Promise<CreateRate201Response> | Observable<CreateRate201Response> {
    return this.ratesApi.createRate(createRateRequest, optPretty, optFields, request);
  }

  @Delete('/rates/:rate_gid')
  deleteRate(@Param('rateGid') rateGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.ratesApi.deleteRate(rateGid, optPretty, request);
  }

  @Get('/rates/:rate_gid')
  getRate(@Param('rateGid') rateGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_by' | 'created_by.name' | 'currency_code' | 'parent' | 'parent.name' | 'rate' | 'resource' | 'resource.name'>, @Req() request: Request): CreateRate201Response | Promise<CreateRate201Response> | Observable<CreateRate201Response> {
    return this.ratesApi.getRate(rateGid, optPretty, optFields, request);
  }

  @Get('/rates')
  getRates(@Query('optPretty') optPretty: boolean, @Query('parent') parent: string, @Query('resource') resource: string, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'offset' | 'path' | 'uri'>, @Req() request: Request): GetRates200Response | Promise<GetRates200Response> | Observable<GetRates200Response> {
    return this.ratesApi.getRates(optPretty, parent, resource, limit, offset, optFields, request);
  }

  @Put('/rates/:rate_gid')
  updateRate(@Param('rateGid') rateGid: string, @Body() updateRateRequest: UpdateRateRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_by' | 'created_by.name' | 'currency_code' | 'parent' | 'parent.name' | 'rate' | 'resource' | 'resource.name'>, @Req() request: Request): CreateRate201Response | Promise<CreateRate201Response> | Observable<CreateRate201Response> {
    return this.ratesApi.updateRate(rateGid, updateRateRequest, optPretty, optFields, request);
  }

} 