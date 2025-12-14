import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventsApi } from '../api';
import { GetEvents200Response,  } from '../models';

@Controller()
export class EventsApiController {
  constructor(private readonly eventsApi: EventsApi) {}

  @Get('/events')
  getEvents(@Query('resource') resource: string, @Query('sync') sync: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'action' | 'change' | 'change.action' | 'change.added_value' | 'change.field' | 'change.new_value' | 'change.removed_value' | 'created_at' | 'parent' | 'parent.name' | 'resource' | 'resource.name' | 'type' | 'user' | 'user.name'>, @Req() request: Request): GetEvents200Response | Promise<GetEvents200Response> | Observable<GetEvents200Response> {
    return this.eventsApi.getEvents(resource, sync, optPretty, optFields, request);
  }

} 