import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateTimeTrackingEntry201Response, CreateTimeTrackingEntryRequest, GetTimeTrackingEntriesForTask200Response, UpdateTimeTrackingEntryRequest,  } from '../models';


@Injectable()
export abstract class TimeTrackingEntriesApi {

  abstract createTimeTrackingEntry(taskGid: string, createTimeTrackingEntryRequest: CreateTimeTrackingEntryRequest, optPretty: boolean, optFields: Array<'approval_status' | 'attributable_to' | 'attributable_to.name' | 'billable_status' | 'created_at' | 'created_by' | 'created_by.name' | 'description' | 'duration_minutes' | 'entered_on' | 'task' | 'task.created_by' | 'task.name' | 'task.resource_subtype'>,  request: Request): CreateTimeTrackingEntry201Response | Promise<CreateTimeTrackingEntry201Response> | Observable<CreateTimeTrackingEntry201Response>;


  abstract deleteTimeTrackingEntry(timeTrackingEntryGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getTimeTrackingEntries(optPretty: boolean, task: string, attributableTo: string, portfolio: string, user: string, workspace: string, enteredOnStartDate: string, enteredOnEndDate: string, limit: number, offset: string, optFields: Array<'attributable_to' | 'attributable_to.name' | 'created_by' | 'created_by.name' | 'duration_minutes' | 'entered_on' | 'offset' | 'path' | 'uri'>,  request: Request): GetTimeTrackingEntriesForTask200Response | Promise<GetTimeTrackingEntriesForTask200Response> | Observable<GetTimeTrackingEntriesForTask200Response>;


  abstract getTimeTrackingEntriesForTask(taskGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'attributable_to' | 'attributable_to.name' | 'created_by' | 'created_by.name' | 'duration_minutes' | 'entered_on' | 'offset' | 'path' | 'uri'>,  request: Request): GetTimeTrackingEntriesForTask200Response | Promise<GetTimeTrackingEntriesForTask200Response> | Observable<GetTimeTrackingEntriesForTask200Response>;


  abstract getTimeTrackingEntry(timeTrackingEntryGid: string, optPretty: boolean, optFields: Array<'approval_status' | 'attributable_to' | 'attributable_to.name' | 'billable_status' | 'created_at' | 'created_by' | 'created_by.name' | 'description' | 'duration_minutes' | 'entered_on' | 'task' | 'task.created_by' | 'task.name' | 'task.resource_subtype'>,  request: Request): CreateTimeTrackingEntry201Response | Promise<CreateTimeTrackingEntry201Response> | Observable<CreateTimeTrackingEntry201Response>;


  abstract updateTimeTrackingEntry(timeTrackingEntryGid: string, updateTimeTrackingEntryRequest: UpdateTimeTrackingEntryRequest, optPretty: boolean, optFields: Array<'approval_status' | 'attributable_to' | 'attributable_to.name' | 'billable_status' | 'created_at' | 'created_by' | 'created_by.name' | 'description' | 'duration_minutes' | 'entered_on' | 'task' | 'task.created_by' | 'task.name' | 'task.resource_subtype'>,  request: Request): CreateTimeTrackingEntry201Response | Promise<CreateTimeTrackingEntry201Response> | Observable<CreateTimeTrackingEntry201Response>;

} 