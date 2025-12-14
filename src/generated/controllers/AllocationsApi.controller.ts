import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AllocationsApi } from '../api';
import type { ApproveAccessRequest200Response, CreateAllocationRequest, GetAllocation200Response, GetAllocations200Response, UpdateAllocationRequest,  } from '../models';

@Controller()
export class AllocationsApiController {
  constructor(private readonly allocationsApi: AllocationsApi) {}

  @Post('/allocations')
  createAllocation(@Body() createAllocationRequest: CreateAllocationRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'parent' | 'parent.name' | 'resource_subtype' | 'start_date'>, @Req() request: Request): GetAllocation200Response | Promise<GetAllocation200Response> | Observable<GetAllocation200Response> {
    return this.allocationsApi.createAllocation(createAllocationRequest, optPretty, optFields, request);
  }

  @Delete('/allocations/:allocation_gid')
  deleteAllocation(@Param('allocationGid') allocationGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.allocationsApi.deleteAllocation(allocationGid, optPretty, request);
  }

  @Get('/allocations/:allocation_gid')
  getAllocation(@Param('allocationGid') allocationGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'parent' | 'parent.name' | 'resource_subtype' | 'start_date'>, @Req() request: Request): GetAllocation200Response | Promise<GetAllocation200Response> | Observable<GetAllocation200Response> {
    return this.allocationsApi.getAllocation(allocationGid, optPretty, optFields, request);
  }

  @Get('/allocations')
  getAllocations(@Query('optPretty') optPretty: boolean, @Query('parent') parent: string, @Query('assignee') assignee: string, @Query('workspace') workspace: string, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'offset' | 'parent' | 'parent.name' | 'path' | 'resource_subtype' | 'start_date' | 'uri'>, @Req() request: Request): GetAllocations200Response | Promise<GetAllocations200Response> | Observable<GetAllocations200Response> {
    return this.allocationsApi.getAllocations(optPretty, parent, assignee, workspace, limit, offset, optFields, request);
  }

  @Put('/allocations/:allocation_gid')
  updateAllocation(@Param('allocationGid') allocationGid: string, @Body() updateAllocationRequest: UpdateAllocationRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'parent' | 'parent.name' | 'resource_subtype' | 'start_date'>, @Req() request: Request): GetAllocation200Response | Promise<GetAllocation200Response> | Observable<GetAllocation200Response> {
    return this.allocationsApi.updateAllocation(allocationGid, updateAllocationRequest, optPretty, optFields, request);
  }

} 