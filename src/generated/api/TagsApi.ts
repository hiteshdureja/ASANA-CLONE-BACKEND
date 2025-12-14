import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateTag201Response, CreateTagForWorkspaceRequest, CreateTagRequest, GetTags200Response, UpdateTagRequest,  } from '../models';


@Injectable()
export abstract class TagsApi {

  abstract createTag(createTagRequest: CreateTagRequest, optPretty: boolean, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>,  request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response>;


  abstract createTagForWorkspace(workspaceGid: string, createTagForWorkspaceRequest: CreateTagForWorkspaceRequest, optPretty: boolean, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>,  request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response>;


  abstract deleteTag(tagGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getTag(tagGid: string, optPretty: boolean, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>,  request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response>;


  abstract getTags(optPretty: boolean, limit: number, offset: string, workspace: string, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'offset' | 'path' | 'permalink_url' | 'uri' | 'workspace' | 'workspace.name'>,  request: Request): GetTags200Response | Promise<GetTags200Response> | Observable<GetTags200Response>;


  abstract getTagsForTask(taskGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'offset' | 'path' | 'permalink_url' | 'uri' | 'workspace' | 'workspace.name'>,  request: Request): GetTags200Response | Promise<GetTags200Response> | Observable<GetTags200Response>;


  abstract getTagsForWorkspace(workspaceGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'offset' | 'path' | 'permalink_url' | 'uri' | 'workspace' | 'workspace.name'>,  request: Request): GetTags200Response | Promise<GetTags200Response> | Observable<GetTags200Response>;


  abstract updateTag(tagGid: string, updateTagRequest: UpdateTagRequest, optPretty: boolean, optFields: Array<'color' | 'created_at' | 'followers' | 'followers.name' | 'name' | 'notes' | 'permalink_url' | 'workspace' | 'workspace.name'>,  request: Request): CreateTag201Response | Promise<CreateTag201Response> | Observable<CreateTag201Response>;

} 