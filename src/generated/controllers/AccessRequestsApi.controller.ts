import { Body, Controller, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessRequestsApi } from '../api';
import type { ApproveAccessRequest200Response, CreateAccessRequest201Response, CreateAccessRequestRequest, GetAccessRequests200Response,  } from '../models';

@Controller()
export class AccessRequestsApiController {
  constructor(private readonly accessRequestsApi: AccessRequestsApi) {}

  @Post('/access_requests/:access_request_gid/approve')
  approveAccessRequest(@Param('accessRequestGid') accessRequestGid: string, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.accessRequestsApi.approveAccessRequest(accessRequestGid, request);
  }

  @Post('/access_requests')
  createAccessRequest(@Body() createAccessRequestRequest: CreateAccessRequestRequest, @Req() request: Request): CreateAccessRequest201Response | Promise<CreateAccessRequest201Response> | Observable<CreateAccessRequest201Response> {
    return this.accessRequestsApi.createAccessRequest(createAccessRequestRequest, request);
  }

  @Get('/access_requests')
  getAccessRequests(@Query('target') target: string, @Query('user') user: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'approval_status' | 'message' | 'requester' | 'requester.name' | 'target'>, @Req() request: Request): GetAccessRequests200Response | Promise<GetAccessRequests200Response> | Observable<GetAccessRequests200Response> {
    return this.accessRequestsApi.getAccessRequests(target, user, optPretty, optFields, request);
  }

  @Post('/access_requests/:access_request_gid/reject')
  rejectAccessRequest(@Param('accessRequestGid') accessRequestGid: string, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.accessRequestsApi.rejectAccessRequest(accessRequestGid, request);
  }

} 