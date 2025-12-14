import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TagsApi } from '../api';
import type { ApproveAccessRequest200Response, CreateTag201Response, CreateTagForWorkspaceRequest, CreateTagRequest, GetTags200Response, UpdateTagRequest,  } from '../models';

@Controller()
export class TagsApiController {
  constructor(private readonly tagsApi: TagsApi) {}

  @Post('/tags')
  createTag(@Body() createTagRequest: CreateTagRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>, @Req() request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response> {
    return this.tagsApi.createTag(createTagRequest, optPretty, optFields, request);
  }

  @Post('/workspaces/:workspace_gid/tags')
  createTagForWorkspace(@Param('workspaceGid') workspaceGid: string, @Body() createTagForWorkspaceRequest: CreateTagForWorkspaceRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>, @Req() request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response> {
    return this.tagsApi.createTagForWorkspace(workspaceGid, createTagForWorkspaceRequest, optPretty, optFields, request);
  }

  @Delete('/tags/:tag_gid')
  deleteTag(@Param('tagGid') tagGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.tagsApi.deleteTag(tagGid, optPretty, request);
  }

  @Get('/tags/:tag_gid')
  getTag(@Param('tagGid') tagGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>, @Req() request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response> {
    return this.tagsApi.getTag(tagGid, optPretty, optFields, request);
  }

  @Get('/tags')
  getTags(@Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('workspace') workspace: string, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'offset' | 'path' | 'permalink_url' | 'uri' | 'workspace' | 'workspace.name'>, @Req() request: Request): GetTags200Response | Promise<GetTags200Response> | Observable<GetTags200Response> {
    return this.tagsApi.getTags(optPretty, limit, offset, workspace, optFields, request);
  }

  @Get('/tasks/:task_gid/tags')
  getTagsForTask(@Param('taskGid') taskGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'offset' | 'path' | 'permalink_url' | 'uri' | 'workspace' | 'workspace.name'>, @Req() request: Request): GetTags200Response | Promise<GetTags200Response> | Observable<GetTags200Response> {
    return this.tagsApi.getTagsForTask(taskGid, optPretty, limit, offset, optFields, request);
  }

  @Get('/workspaces/:workspace_gid/tags')
  getTagsForWorkspace(@Param('workspaceGid') workspaceGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'offset' | 'path' | 'permalink_url' | 'uri' | 'workspace' | 'workspace.name'>, @Req() request: Request): GetTags200Response | Promise<GetTags200Response> | Observable<GetTags200Response> {
    return this.tagsApi.getTagsForWorkspace(workspaceGid, optPretty, limit, offset, optFields, request);
  }

  @Put('/tags/:tag_gid')
  updateTag(@Param('tagGid') tagGid: string, @Body() updateTagRequest: UpdateTagRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>, @Req() request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response> {
    return this.tagsApi.updateTag(tagGid, updateTagRequest, optPretty, optFields, request);
  }

} 