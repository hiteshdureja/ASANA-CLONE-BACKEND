import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateProjectStatusForProjectRequest, GetProjectStatus200Response, GetProjectStatusesForProject200Response,  } from '../models';


@Injectable()
export abstract class ProjectStatusesApi {

  abstract createProjectStatusForProject(projectGid: string, createProjectStatusForProjectRequest: CreateProjectStatusForProjectRequest, optPretty: boolean, optFields: Array<'author' | 'author.name' | 'color' | 'created_at' | 'created_by' | 'created_by.name' | 'html_text' | 'modified_at' | 'text' | 'title'>,  request: Request): GetProjectStatus200Response | Promise<GetProjectStatus200Response> | Observable<GetProjectStatus200Response>;


  abstract deleteProjectStatus(projectStatusGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getProjectStatus(projectStatusGid: string, optPretty: boolean, optFields: Array<'author' | 'author.name' | 'color' | 'created_at' | 'created_by' | 'created_by.name' | 'html_text' | 'modified_at' | 'text' | 'title'>,  request: Request): GetProjectStatus200Response | Promise<GetProjectStatus200Response> | Observable<GetProjectStatus200Response>;


  abstract getProjectStatusesForProject(projectGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'author' | 'author.name' | 'color' | 'created_at' | 'created_by' | 'created_by.name' | 'html_text' | 'modified_at' | 'offset' | 'path' | 'text' | 'title' | 'uri'>,  request: Request): GetProjectStatusesForProject200Response | Promise<GetProjectStatusesForProject200Response> | Observable<GetProjectStatusesForProject200Response>;

} 