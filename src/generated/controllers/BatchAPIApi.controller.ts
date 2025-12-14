import { Body, Controller, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BatchAPIApi } from '../api';
import type { CreateBatchRequest200Response, CreateBatchRequestRequest,  } from '../models';

@Controller()
export class BatchAPIApiController {
  constructor(private readonly batchAPIApi: BatchAPIApi) {}

  @Post('/batch')
  createBatchRequest(@Body() createBatchRequestRequest: CreateBatchRequestRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'body' | 'headers' | 'status_code'>, @Req() request: Request): CreateBatchRequest200Response | Promise<CreateBatchRequest200Response> | Observable<CreateBatchRequest200Response> {
    return this.batchAPIApi.createBatchRequest(createBatchRequestRequest, optPretty, optFields, request);
  }

} 