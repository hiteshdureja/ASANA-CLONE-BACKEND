import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateAllocationRequest, GetAllocation200Response, GetAllocations200Response, UpdateAllocationRequest,  } from '../models';


@Injectable()
export abstract class AllocationsApi {

  abstract createAllocation(createAllocationRequest: CreateAllocationRequest, optPretty: boolean, optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'parent' | 'parent.name' | 'resource_subtype' | 'start_date'>,  request: Request): GetAllocation200Response | Promise<GetAllocation200Response> | Observable<GetAllocation200Response>;


  abstract deleteAllocation(allocationGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getAllocation(allocationGid: string, optPretty: boolean, optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'parent' | 'parent.name' | 'resource_subtype' | 'start_date'>,  request: Request): GetAllocation200Response | Promise<GetAllocation200Response> | Observable<GetAllocation200Response>;


  abstract getAllocations(optPretty: boolean, parent: string, assignee: string, workspace: string, limit: number, offset: string, optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'offset' | 'parent' | 'parent.name' | 'path' | 'resource_subtype' | 'start_date' | 'uri'>,  request: Request): GetAllocations200Response | Promise<GetAllocations200Response> | Observable<GetAllocations200Response>;


  abstract updateAllocation(allocationGid: string, updateAllocationRequest: UpdateAllocationRequest, optPretty: boolean, optFields: Array<'assignee' | 'assignee.name' | 'created_by' | 'created_by.name' | 'effort' | 'effort.type' | 'effort.value' | 'end_date' | 'parent' | 'parent.name' | 'resource_subtype' | 'start_date'>,  request: Request): GetAllocation200Response | Promise<GetAllocation200Response> | Observable<GetAllocation200Response>;

} 