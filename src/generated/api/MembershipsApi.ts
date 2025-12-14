import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateMembership201Response, CreateMembershipRequest, GetMemberships200Response, UpdateMembershipRequest,  } from '../models';


@Injectable()
export abstract class MembershipsApi {

  abstract createMembership(optPretty: boolean, createMembershipRequest: CreateMembershipRequest,  request: Request): CreateMembership201Response | Promise<CreateMembership201Response> | Observable<CreateMembership201Response>;


  abstract deleteMembership(membershipGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getMembership(membershipGid: string, optPretty: boolean,  request: Request): CreateMembership201Response | Promise<CreateMembership201Response> | Observable<CreateMembership201Response>;


  abstract getMemberships(optPretty: boolean, parent: string, member: string, limit: number, offset: string, optFields: Array<'offset' | 'path' | 'uri'>,  request: Request): GetMemberships200Response | Promise<GetMemberships200Response> | Observable<GetMemberships200Response>;


  abstract updateMembership(membershipGid: string, updateMembershipRequest: UpdateMembershipRequest, optPretty: boolean,  request: Request): CreateMembership201Response | Promise<CreateMembership201Response> | Observable<CreateMembership201Response>;

} 