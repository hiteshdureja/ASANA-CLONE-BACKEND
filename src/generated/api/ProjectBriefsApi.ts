import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, GetProjectBrief200Response, UpdateProjectBriefRequest,  } from '../models';


@Injectable()
export abstract class ProjectBriefsApi {

  abstract createProjectBrief(projectGid: string, updateProjectBriefRequest: UpdateProjectBriefRequest, optPretty: boolean, optFields: Array<'html_text' | 'permalink_url' | 'project' | 'project.name' | 'text' | 'title'>,  request: Request): GetProjectBrief200Response | Promise<GetProjectBrief200Response> | Observable<GetProjectBrief200Response>;


  abstract deleteProjectBrief(projectBriefGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getProjectBrief(projectBriefGid: string, optPretty: boolean, optFields: Array<'html_text' | 'permalink_url' | 'project' | 'project.name' | 'text' | 'title'>,  request: Request): GetProjectBrief200Response | Promise<GetProjectBrief200Response> | Observable<GetProjectBrief200Response>;


  abstract updateProjectBrief(projectBriefGid: string, updateProjectBriefRequest: UpdateProjectBriefRequest, optPretty: boolean, optFields: Array<'html_text' | 'permalink_url' | 'project' | 'project.name' | 'text' | 'title'>,  request: Request): GetProjectBrief200Response | Promise<GetProjectBrief200Response> | Observable<GetProjectBrief200Response>;

} 