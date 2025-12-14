import { Body, Controller, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkspacesApi } from '../api';
import type { AddUserForWorkspace200Response, AddUserForWorkspaceRequest, ApproveAccessRequest200Response, GetEvents200Response, GetWorkspace200Response, GetWorkspaces200Response, RemoveUserForWorkspaceRequest, UpdateWorkspaceRequest,  } from '../models';

@Controller()
export class WorkspacesApiController {
  constructor(private readonly workspacesApi: WorkspacesApi) {}

  @Post('/workspaces/:workspace_gid/addUser')
  addUserForWorkspace(@Param('workspaceGid') workspaceGid: string, @Body() addUserForWorkspaceRequest: AddUserForWorkspaceRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'email' | 'name' | 'photo' | 'photo.image_1024x1024' | 'photo.image_128x128' | 'photo.image_21x21' | 'photo.image_27x27' | 'photo.image_36x36' | 'photo.image_60x60'>, @Req() request: Request): AddUserForWorkspace200Response | Promise<AddUserForWorkspace200Response> | Observable<AddUserForWorkspace200Response> {
    return this.workspacesApi.addUserForWorkspace(workspaceGid, addUserForWorkspaceRequest, optPretty, optFields, request);
  }

  @Get('/workspaces/:workspace_gid')
  getWorkspace(@Param('workspaceGid') workspaceGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'email_domains' | 'is_organization' | 'name'>, @Req() request: Request): GetWorkspace200Response | Promise<GetWorkspace200Response> | Observable<GetWorkspace200Response> {
    return this.workspacesApi.getWorkspace(workspaceGid, optPretty, optFields, request);
  }

  @Get('/workspaces/:workspace_gid/events')
  getWorkspaceEvents(@Param('workspaceGid') workspaceGid: string, @Query('optPretty') optPretty: boolean, @Query('sync') sync: string, @Req() request: Request): GetEvents200Response | Promise<GetEvents200Response> | Observable<GetEvents200Response> {
    return this.workspacesApi.getWorkspaceEvents(workspaceGid, optPretty, sync, request);
  }

  @Get('/workspaces')
  getWorkspaces(@Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'email_domains' | 'is_organization' | 'name' | 'offset' | 'path' | 'uri'>, @Req() request: Request): GetWorkspaces200Response | Promise<GetWorkspaces200Response> | Observable<GetWorkspaces200Response> {
    return this.workspacesApi.getWorkspaces(optPretty, limit, offset, optFields, request);
  }

  @Post('/workspaces/:workspace_gid/removeUser')
  removeUserForWorkspace(@Param('workspaceGid') workspaceGid: string, @Body() removeUserForWorkspaceRequest: RemoveUserForWorkspaceRequest, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.workspacesApi.removeUserForWorkspace(workspaceGid, removeUserForWorkspaceRequest, optPretty, request);
  }

  @Put('/workspaces/:workspace_gid')
  updateWorkspace(@Param('workspaceGid') workspaceGid: string, @Body() updateWorkspaceRequest: UpdateWorkspaceRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'email_domains' | 'is_organization' | 'name'>, @Req() request: Request): GetWorkspace200Response | Promise<GetWorkspace200Response> | Observable<GetWorkspace200Response> {
    return this.workspacesApi.updateWorkspace(workspaceGid, updateWorkspaceRequest, optPretty, optFields, request);
  }

} 