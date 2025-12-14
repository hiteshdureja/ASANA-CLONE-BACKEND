import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddUserForWorkspace200Response, AddUserForWorkspaceRequest, ApproveAccessRequest200Response, GetEvents200Response, GetWorkspace200Response, GetWorkspaces200Response, RemoveUserForWorkspaceRequest, UpdateWorkspaceRequest,  } from '../models';


@Injectable()
export abstract class WorkspacesApi {

  abstract addUserForWorkspace(workspaceGid: string, addUserForWorkspaceRequest: AddUserForWorkspaceRequest, optPretty: boolean, optFields: Array<'email' | 'name' | 'photo' | 'photo.image_1024x1024' | 'photo.image_128x128' | 'photo.image_21x21' | 'photo.image_27x27' | 'photo.image_36x36' | 'photo.image_60x60'>,  request: Request): AddUserForWorkspace200Response | Promise<AddUserForWorkspace200Response> | Observable<AddUserForWorkspace200Response>;


  abstract getWorkspace(workspaceGid: string, optPretty: boolean, optFields: Array<'email_domains' | 'is_organization' | 'name'>,  request: Request): GetWorkspace200Response | Promise<GetWorkspace200Response> | Observable<GetWorkspace200Response>;


  abstract getWorkspaceEvents(workspaceGid: string, optPretty: boolean, sync: string,  request: Request): GetEvents200Response | Promise<GetEvents200Response> | Observable<GetEvents200Response>;


  abstract getWorkspaces(optPretty: boolean, limit: number, offset: string, optFields: Array<'email_domains' | 'is_organization' | 'name' | 'offset' | 'path' | 'uri'>,  request: Request): GetWorkspaces200Response | Promise<GetWorkspaces200Response> | Observable<GetWorkspaces200Response>;


  abstract removeUserForWorkspace(workspaceGid: string, removeUserForWorkspaceRequest: RemoveUserForWorkspaceRequest, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract updateWorkspace(workspaceGid: string, updateWorkspaceRequest: UpdateWorkspaceRequest, optPretty: boolean, optFields: Array<'email_domains' | 'is_organization' | 'name'>,  request: Request): GetWorkspace200Response | Promise<GetWorkspace200Response> | Observable<GetWorkspace200Response>;

} 