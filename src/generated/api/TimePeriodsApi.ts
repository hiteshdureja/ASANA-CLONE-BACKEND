import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetTimePeriod200Response, GetTimePeriods200Response,  } from '../models';


@Injectable()
export abstract class TimePeriodsApi {

  abstract getTimePeriod(timePeriodGid: string, optPretty: boolean, optFields: Array<'display_name' | 'end_on' | 'parent' | 'parent.display_name' | 'parent.end_on' | 'parent.period' | 'parent.start_on' | 'period' | 'start_on'>,  request: Request): GetTimePeriod200Response | Promise<GetTimePeriod200Response> | Observable<GetTimePeriod200Response>;


  abstract getTimePeriods(workspace: string, optPretty: boolean, limit: number, offset: string, startOn: string, endOn: string, optFields: Array<'display_name' | 'end_on' | 'offset' | 'parent' | 'parent.display_name' | 'parent.end_on' | 'parent.period' | 'parent.start_on' | 'path' | 'period' | 'start_on' | 'uri'>,  request: Request): GetTimePeriods200Response | Promise<GetTimePeriods200Response> | Observable<GetTimePeriods200Response>;

} 