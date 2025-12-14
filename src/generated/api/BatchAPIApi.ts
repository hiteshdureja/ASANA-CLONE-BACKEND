import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateBatchRequest200Response, CreateBatchRequestRequest,  } from '../models';


@Injectable()
export abstract class BatchAPIApi {

  abstract createBatchRequest(createBatchRequestRequest: CreateBatchRequestRequest, optPretty: boolean, optFields: Array<'body' | 'headers' | 'status_code'>,  request: Request): CreateBatchRequest200Response | Promise<CreateBatchRequest200Response> | Observable<CreateBatchRequest200Response>;

} 