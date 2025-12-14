import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateAccessRequest201Response, CreateAccessRequestRequest, GetAccessRequests200Response,  } from '../models';


@Injectable()
export abstract class AccessRequestsApi {

  abstract approveAccessRequest(accessRequestGid: string,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract createAccessRequest(createAccessRequestRequest: CreateAccessRequestRequest,  request: Request): CreateAccessRequest201Response | Promise<CreateAccessRequest201Response> | Observable<CreateAccessRequest201Response>;


  abstract getAccessRequests(target: string, user: string, optPretty: boolean, optFields: Array<'approval_status' | 'message' | 'requester' | 'requester.name' | 'target'>,  request: Request): GetAccessRequests200Response | Promise<GetAccessRequests200Response> | Observable<GetAccessRequests200Response>;


  abstract rejectAccessRequest(accessRequestGid: string,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;

} 