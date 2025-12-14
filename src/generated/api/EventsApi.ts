import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetEvents200Response,  } from '../models';


@Injectable()
export abstract class EventsApi {

  abstract getEvents(resource: string, sync: string, optPretty: boolean, optFields: Array<'action' | 'change' | 'change.action' | 'change.added_value' | 'change.field' | 'change.new_value' | 'change.removed_value' | 'created_at' | 'parent' | 'parent.name' | 'resource' | 'resource.name' | 'type' | 'user' | 'user.name'>,  request: Request): GetEvents200Response | Promise<GetEvents200Response> | Observable<GetEvents200Response>;

} 