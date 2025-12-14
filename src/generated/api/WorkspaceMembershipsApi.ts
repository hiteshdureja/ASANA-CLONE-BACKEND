import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetWorkspaceMembership200Response, GetWorkspaceMembershipsForUser200Response,  } from '../models';


@Injectable()
export abstract class WorkspaceMembershipsApi {

  abstract getWorkspaceMembership(workspaceMembershipGid: string, optPretty: boolean, optFields: Array<'created_at' | 'is_active' | 'is_admin' | 'is_guest' | 'is_view_only' | 'user' | 'user.name' | 'user_task_list' | 'user_task_list.name' | 'user_task_list.owner' | 'user_task_list.workspace' | 'vacation_dates' | 'vacation_dates.end_on' | 'vacation_dates.start_on' | 'workspace' | 'workspace.name'>,  request: Request): GetWorkspaceMembership200Response | Promise<GetWorkspaceMembership200Response> | Observable<GetWorkspaceMembership200Response>;


  abstract getWorkspaceMembershipsForUser(userGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'created_at' | 'is_active' | 'is_admin' | 'is_guest' | 'is_view_only' | 'offset' | 'path' | 'uri' | 'user' | 'user.name' | 'user_task_list' | 'user_task_list.name' | 'user_task_list.owner' | 'user_task_list.workspace' | 'vacation_dates' | 'vacation_dates.end_on' | 'vacation_dates.start_on' | 'workspace' | 'workspace.name'>,  request: Request): GetWorkspaceMembershipsForUser200Response | Promise<GetWorkspaceMembershipsForUser200Response> | Observable<GetWorkspaceMembershipsForUser200Response>;


  abstract getWorkspaceMembershipsForWorkspace(workspaceGid: string, user: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'created_at' | 'is_active' | 'is_admin' | 'is_guest' | 'is_view_only' | 'offset' | 'path' | 'uri' | 'user' | 'user.name' | 'user_task_list' | 'user_task_list.name' | 'user_task_list.owner' | 'user_task_list.workspace' | 'vacation_dates' | 'vacation_dates.end_on' | 'vacation_dates.start_on' | 'workspace' | 'workspace.name'>,  request: Request): GetWorkspaceMembershipsForUser200Response | Promise<GetWorkspaceMembershipsForUser200Response> | Observable<GetWorkspaceMembershipsForUser200Response>;

} 