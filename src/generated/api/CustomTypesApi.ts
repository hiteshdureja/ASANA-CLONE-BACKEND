import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetCustomType200Response, GetCustomTypes200Response,  } from '../models';


@Injectable()
export abstract class CustomTypesApi {

  abstract getCustomType(customTypeGid: string, optPretty: boolean, optFields: Array<'name' | 'status_options' | 'status_options.color' | 'status_options.completion_state' | 'status_options.enabled' | 'status_options.name'>,  request: Request): GetCustomType200Response | Promise<GetCustomType200Response> | Observable<GetCustomType200Response>;


  abstract getCustomTypes(project: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'name' | 'offset' | 'path' | 'status_options' | 'status_options.color' | 'status_options.completion_state' | 'status_options.enabled' | 'status_options.name' | 'uri'>,  request: Request): GetCustomTypes200Response | Promise<GetCustomTypes200Response> | Observable<GetCustomTypes200Response>;

} 