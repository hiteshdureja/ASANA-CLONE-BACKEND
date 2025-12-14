import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TimePeriodsApi } from '../api';
import { GetTimePeriod200Response, GetTimePeriods200Response,  } from '../models';

@Controller()
export class TimePeriodsApiController {
  constructor(private readonly timePeriodsApi: TimePeriodsApi) {}

  @Get('/time_periods/:time_period_gid')
  getTimePeriod(@Param('timePeriodGid') timePeriodGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'display_name' | 'end_on' | 'parent' | 'parent.display_name' | 'parent.end_on' | 'parent.period' | 'parent.start_on' | 'period' | 'start_on'>, @Req() request: Request): GetTimePeriod200Response | Promise<GetTimePeriod200Response> | Observable<GetTimePeriod200Response> {
    return this.timePeriodsApi.getTimePeriod(timePeriodGid, optPretty, optFields, request);
  }

  @Get('/time_periods')
  getTimePeriods(@Query('workspace') workspace: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('startOn') startOn: string, @Query('endOn') endOn: string, @Query('optFields') optFields: Array<'display_name' | 'end_on' | 'offset' | 'parent' | 'parent.display_name' | 'parent.end_on' | 'parent.period' | 'parent.start_on' | 'path' | 'period' | 'start_on' | 'uri'>, @Req() request: Request): GetTimePeriods200Response | Promise<GetTimePeriods200Response> | Observable<GetTimePeriods200Response> {
    return this.timePeriodsApi.getTimePeriods(workspace, optPretty, limit, offset, startOn, endOn, optFields, request);
  }

} 