import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MembershipsApi } from '../api';
import type { ApproveAccessRequest200Response, CreateMembership201Response, CreateMembershipRequest, GetMemberships200Response, UpdateMembershipRequest,  } from '../models';

@Controller()
export class MembershipsApiController {
  constructor(private readonly membershipsApi: MembershipsApi) {}

  @Post('/memberships')
  createMembership(@Query('optPretty') optPretty: boolean, @Body() createMembershipRequest: CreateMembershipRequest, @Req() request: Request): CreateMembership201Response | Promise<CreateMembership201Response> | Observable<CreateMembership201Response> {
    return this.membershipsApi.createMembership(optPretty, createMembershipRequest, request);
  }

  @Delete('/memberships/:membership_gid')
  deleteMembership(@Param('membershipGid') membershipGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.membershipsApi.deleteMembership(membershipGid, optPretty, request);
  }

  @Get('/memberships/:membership_gid')
  getMembership(@Param('membershipGid') membershipGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): CreateMembership201Response | Promise<CreateMembership201Response> | Observable<CreateMembership201Response> {
    return this.membershipsApi.getMembership(membershipGid, optPretty, request);
  }

  @Get('/memberships')
  getMemberships(@Query('optPretty') optPretty: boolean, @Query('parent') parent: string, @Query('member') member: string, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'offset' | 'path' | 'uri'>, @Req() request: Request): GetMemberships200Response | Promise<GetMemberships200Response> | Observable<GetMemberships200Response> {
    return this.membershipsApi.getMemberships(optPretty, parent, member, limit, offset, optFields, request);
  }

  @Put('/memberships/:membership_gid')
  updateMembership(@Param('membershipGid') membershipGid: string, @Body() updateMembershipRequest: UpdateMembershipRequest, @Query('optPretty') optPretty: boolean, @Req() request: Request): CreateMembership201Response | Promise<CreateMembership201Response> | Observable<CreateMembership201Response> {
    return this.membershipsApi.updateMembership(membershipGid, updateMembershipRequest, optPretty, request);
  }

} 