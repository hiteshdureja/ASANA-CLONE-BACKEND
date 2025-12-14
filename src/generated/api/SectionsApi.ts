import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddTaskForSectionRequest, ApproveAccessRequest200Response, GetSection200Response, GetSectionsForProject200Response, InsertSectionForProjectRequest, UpdateSectionRequest,  } from '../models';


@Injectable()
export abstract class SectionsApi {

  abstract addTaskForSection(sectionGid: string, optPretty: boolean, addTaskForSectionRequest: AddTaskForSectionRequest,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract createSectionForProject(projectGid: string, optPretty: boolean, optFields: Array<'created_at' | 'name' | 'project' | 'project.name' | 'projects' | 'projects.name'>, updateSectionRequest: UpdateSectionRequest,  request: Request): GetSection200Response | Promise<GetSection200Response> | Observable<GetSection200Response>;


  abstract deleteSection(sectionGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getSection(sectionGid: string, optPretty: boolean, optFields: Array<'created_at' | 'name' | 'project' | 'project.name' | 'projects' | 'projects.name'>,  request: Request): GetSection200Response | Promise<GetSection200Response> | Observable<GetSection200Response>;


  abstract getSectionsForProject(projectGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'created_at' | 'name' | 'offset' | 'path' | 'project' | 'project.name' | 'projects' | 'projects.name' | 'uri'>,  request: Request): GetSectionsForProject200Response | Promise<GetSectionsForProject200Response> | Observable<GetSectionsForProject200Response>;


  abstract insertSectionForProject(projectGid: string, optPretty: boolean, insertSectionForProjectRequest: InsertSectionForProjectRequest,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract updateSection(sectionGid: string, optPretty: boolean, optFields: Array<'created_at' | 'name' | 'project' | 'project.name' | 'projects' | 'projects.name'>, updateSectionRequest: UpdateSectionRequest,  request: Request): GetSection200Response | Promise<GetSection200Response> | Observable<GetSection200Response>;

} 