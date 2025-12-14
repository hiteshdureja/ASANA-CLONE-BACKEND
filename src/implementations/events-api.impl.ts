import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { EventsApi } from '../generated/api';
import {
  GetEvents200Response,
} from '../generated/models';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class EventsApiImpl extends EventsApi {
  constructor() {
    super();
  }

  async getEvents(
    resource: string,
    sync: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetEvents200Response> {
    // Events are typically stored in an event log
    // For now, return empty events with a new sync token
    return {
      data: [],
      sync: generateGid('sync'),
      has_more: false,
    };
  }
}
