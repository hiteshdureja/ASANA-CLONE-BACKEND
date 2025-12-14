import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkspaceMembershipsApi } from '../api';
import { GetWorkspaceMembership200Response, GetWorkspaceMembershipsForUser200Response,  } from '../models';

@Controller()
export class WorkspaceMembershipsApiController {
  constructor(private readonly workspaceMembershipsApi: WorkspaceMembershipsApi) {}

  @Get('/workspace_memberships/:workspace_membership_gid')
  getWorkspaceMembership(@Param('workspaceMembershipGid') workspaceMembershipGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'is_active' | 'is_admin' | 'is_guest' | 'is_view_only' | 'user' | 'user.name' | 'user_task_list' | 'user_task_list.name' | 'user_task_list.owner' | 'user_task_list.workspace' | 'vacation_dates' | 'vacation_dates.end_on' | 'vacation_dates.start_on' | 'workspace' | 'workspace.name'>, @Req() request: Request): GetWorkspaceMembership200Response | Promise<GetWorkspaceMembership200Response> | Observable<GetWorkspaceMembership200Response> {
    return this.workspaceMembershipsApi.getWorkspaceMembership(workspaceMembershipGid, optPretty, optFields, request);
  }

  @Get('/users/:user_gid/workspace_memberships')
  getWorkspaceMembershipsForUser(@Param('userGid') userGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'created_at' | 'is_active' | 'is_admin' | 'is_guest' | 'is_view_only' | 'offset' | 'path' | 'uri' | 'user' | 'user.name' | 'user_task_list' | 'user_task_list.name' | 'user_task_list.owner' | 'user_task_list.workspace' | 'vacation_dates' | 'vacation_dates.end_on' | 'vacation_dates.start_on' | 'workspace' | 'workspace.name'>, @Req() request: Request): GetWorkspaceMembershipsForUser200Response | Promise<GetWorkspaceMembershipsForUser200Response> | Observable<GetWorkspaceMembershipsForUser200Response> {
    return this.workspaceMembershipsApi.getWorkspaceMembershipsForUser(userGid, optPretty, limit, offset, optFields, request);
  }

  @Get('/workspaces/:workspace_gid/workspace_memberships')
  getWorkspaceMembershipsForWorkspace(@Param('workspaceGid') workspaceGid: string, @Query('user') user: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'created_at' | 'is_active' | 'is_admin' | 'is_guest' | 'is_view_only' | 'offset' | 'path' | 'uri' | 'user' | 'user.name' | 'user_task_list' | 'user_task_list.name' | 'user_task_list.owner' | 'user_task_list.workspace' | 'vacation_dates' | 'vacation_dates.end_on' | 'vacation_dates.start_on' | 'workspace' | 'workspace.name'>, @Req() request: Request): GetWorkspaceMembershipsForUser200Response | Promise<GetWorkspaceMembershipsForUser200Response> | Observable<GetWorkspaceMembershipsForUser200Response> {
    return this.workspaceMembershipsApi.getWorkspaceMembershipsForWorkspace(workspaceGid, user, optPretty, limit, offset, optFields, request);
  }

} 