import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, GetJob200Response, GetTaskTemplate200Response, GetTaskTemplates200Response, InstantiateTaskRequest,  } from '../models';


@Injectable()
export abstract class TaskTemplatesApi {

  abstract deleteTaskTemplate(taskTemplateGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getTaskTemplate(taskTemplateGid: string, optPretty: boolean, optFields: Array<'created_at' | 'created_by' | 'name' | 'project' | 'template'>,  request: Request): GetTaskTemplate200Response | Promise<GetTaskTemplate200Response> | Observable<GetTaskTemplate200Response>;


  abstract getTaskTemplates(optPretty: boolean, limit: number, offset: string, project: string, optFields: Array<'created_at' | 'created_by' | 'name' | 'project' | 'template'>,  request: Request): GetTaskTemplates200Response | Promise<GetTaskTemplates200Response> | Observable<GetTaskTemplates200Response>;


  abstract instantiateTask(taskTemplateGid: string, optPretty: boolean, optFields: Array<'new_graph_export' | 'new_graph_export.completed_at' | 'new_graph_export.created_at' | 'new_graph_export.download_url' | 'new_project' | 'new_project.name' | 'new_project_template' | 'new_project_template.name' | 'new_resource_export' | 'new_resource_export.completed_at' | 'new_resource_export.created_at' | 'new_resource_export.download_url' | 'new_task' | 'new_task.created_by' | 'new_task.name' | 'new_task.resource_subtype' | 'new_task_template' | 'new_task_template.name' | 'resource_subtype' | 'status'>, instantiateTaskRequest: InstantiateTaskRequest,  request: Request): GetJob200Response | Promise<GetJob200Response> | Observable<GetJob200Response>;

} 