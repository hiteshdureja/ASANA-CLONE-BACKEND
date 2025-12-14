import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TimeTrackingEntriesApi } from '../api';
import type { ApproveAccessRequest200Response, CreateTimeTrackingEntry201Response, CreateTimeTrackingEntryRequest, GetTimeTrackingEntriesForTask200Response, UpdateTimeTrackingEntryRequest,  } from '../models';

@Controller()
export class TimeTrackingEntriesApiController {
  constructor(private readonly timeTrackingEntriesApi: TimeTrackingEntriesApi) {}

  @Post('/tasks/:task_gid/time_tracking_entries')
  createTimeTrackingEntry(@Param('taskGid') taskGid: string, @Body() createTimeTrackingEntryRequest: CreateTimeTrackingEntryRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'approval_status' | 'attributable_to' | 'attributable_to.name' | 'billable_status' | 'created_at' | 'created_by' | 'created_by.name' | 'description' | 'duration_minutes' | 'entered_on' | 'task' | 'task.created_by' | 'task.name' | 'task.resource_subtype'>, @Req() request: Request): CreateTimeTrackingEntry201Response | Promise<CreateTimeTrackingEntry201Response> | Observable<CreateTimeTrackingEntry201Response> {
    return this.timeTrackingEntriesApi.createTimeTrackingEntry(taskGid, createTimeTrackingEntryRequest, optPretty, optFields, request);
  }

  @Delete('/time_tracking_entries/:time_tracking_entry_gid')
  deleteTimeTrackingEntry(@Param('timeTrackingEntryGid') timeTrackingEntryGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.timeTrackingEntriesApi.deleteTimeTrackingEntry(timeTrackingEntryGid, optPretty, request);
  }

  @Get('/time_tracking_entries')
  getTimeTrackingEntries(@Query('optPretty') optPretty: boolean, @Query('task') task: string, @Query('attributableTo') attributableTo: string, @Query('portfolio') portfolio: string, @Query('user') user: string, @Query('workspace') workspace: string, @Query('enteredOnStartDate') enteredOnStartDate: string, @Query('enteredOnEndDate') enteredOnEndDate: string, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'attributable_to' | 'attributable_to.name' | 'created_by' | 'created_by.name' | 'duration_minutes' | 'entered_on' | 'offset' | 'path' | 'uri'>, @Req() request: Request): GetTimeTrackingEntriesForTask200Response | Promise<GetTimeTrackingEntriesForTask200Response> | Observable<GetTimeTrackingEntriesForTask200Response> {
    return this.timeTrackingEntriesApi.getTimeTrackingEntries(optPretty, task, attributableTo, portfolio, user, workspace, enteredOnStartDate, enteredOnEndDate, limit, offset, optFields, request);
  }

  @Get('/tasks/:task_gid/time_tracking_entries')
  getTimeTrackingEntriesForTask(@Param('taskGid') taskGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'attributable_to' | 'attributable_to.name' | 'created_by' | 'created_by.name' | 'duration_minutes' | 'entered_on' | 'offset' | 'path' | 'uri'>, @Req() request: Request): GetTimeTrackingEntriesForTask200Response | Promise<GetTimeTrackingEntriesForTask200Response> | Observable<GetTimeTrackingEntriesForTask200Response> {
    return this.timeTrackingEntriesApi.getTimeTrackingEntriesForTask(taskGid, optPretty, limit, offset, optFields, request);
  }

  @Get('/time_tracking_entries/:time_tracking_entry_gid')
  getTimeTrackingEntry(@Param('timeTrackingEntryGid') timeTrackingEntryGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'approval_status' | 'attributable_to' | 'attributable_to.name' | 'billable_status' | 'created_at' | 'created_by' | 'created_by.name' | 'description' | 'duration_minutes' | 'entered_on' | 'task' | 'task.created_by' | 'task.name' | 'task.resource_subtype'>, @Req() request: Request): CreateTimeTrackingEntry201Response | Promise<CreateTimeTrackingEntry201Response> | Observable<CreateTimeTrackingEntry201Response> {
    return this.timeTrackingEntriesApi.getTimeTrackingEntry(timeTrackingEntryGid, optPretty, optFields, request);
  }

  @Put('/time_tracking_entries/:time_tracking_entry_gid')
  updateTimeTrackingEntry(@Param('timeTrackingEntryGid') timeTrackingEntryGid: string, @Body() updateTimeTrackingEntryRequest: UpdateTimeTrackingEntryRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'approval_status' | 'attributable_to' | 'attributable_to.name' | 'billable_status' | 'created_at' | 'created_by' | 'created_by.name' | 'description' | 'duration_minutes' | 'entered_on' | 'task' | 'task.created_by' | 'task.name' | 'task.resource_subtype'>, @Req() request: Request): CreateTimeTrackingEntry201Response | Promise<CreateTimeTrackingEntry201Response> | Observable<CreateTimeTrackingEntry201Response> {
    return this.timeTrackingEntriesApi.updateTimeTrackingEntry(timeTrackingEntryGid, updateTimeTrackingEntryRequest, optPretty, optFields, request);
  }

} 