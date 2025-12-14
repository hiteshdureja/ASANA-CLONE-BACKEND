import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, GetJob200Response, GetProjectTemplate200Response, GetProjectTemplates200Response, InstantiateProjectRequest,  } from '../models';


@Injectable()
export abstract class ProjectTemplatesApi {

  abstract deleteProjectTemplate(projectTemplateGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getProjectTemplate(projectTemplateGid: string, optPretty: boolean, optFields: Array<'color' | 'description' | 'html_description' | 'name' | 'owner' | 'public' | 'requested_dates' | 'requested_dates.description' | 'requested_dates.name' | 'requested_roles' | 'requested_roles.name' | 'team' | 'team.name'>,  request: Request): GetProjectTemplate200Response | Promise<GetProjectTemplate200Response> | Observable<GetProjectTemplate200Response>;


  abstract getProjectTemplates(optPretty: boolean, workspace: string, team: string, limit: number, offset: string, optFields: Array<'color' | 'description' | 'html_description' | 'name' | 'offset' | 'owner' | 'path' | 'public' | 'requested_dates' | 'requested_dates.description' | 'requested_dates.name' | 'requested_roles' | 'requested_roles.name' | 'team' | 'team.name' | 'uri'>,  request: Request): GetProjectTemplates200Response | Promise<GetProjectTemplates200Response> | Observable<GetProjectTemplates200Response>;


  abstract getProjectTemplatesForTeam(teamGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'color' | 'description' | 'html_description' | 'name' | 'offset' | 'owner' | 'path' | 'public' | 'requested_dates' | 'requested_dates.description' | 'requested_dates.name' | 'requested_roles' | 'requested_roles.name' | 'team' | 'team.name' | 'uri'>,  request: Request): GetProjectTemplates200Response | Promise<GetProjectTemplates200Response> | Observable<GetProjectTemplates200Response>;


  abstract instantiateProject(projectTemplateGid: string, optPretty: boolean, optFields: Array<'new_graph_export' | 'new_graph_export.completed_at' | 'new_graph_export.created_at' | 'new_graph_export.download_url' | 'new_project' | 'new_project.name' | 'new_project_template' | 'new_project_template.name' | 'new_resource_export' | 'new_resource_export.completed_at' | 'new_resource_export.created_at' | 'new_resource_export.download_url' | 'new_task' | 'new_task.created_by' | 'new_task.name' | 'new_task.resource_subtype' | 'new_task_template' | 'new_task_template.name' | 'resource_subtype' | 'status'>, instantiateProjectRequest: InstantiateProjectRequest,  request: Request): GetJob200Response | Promise<GetJob200Response> | Observable<GetJob200Response>;

} 