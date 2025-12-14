import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetJob200Response,  } from '../models';


@Injectable()
export abstract class JobsApi {

  abstract getJob(jobGid: string, optPretty: boolean, optFields: Array<'new_graph_export' | 'new_graph_export.completed_at' | 'new_graph_export.created_at' | 'new_graph_export.download_url' | 'new_project' | 'new_project.name' | 'new_project_template' | 'new_project_template.name' | 'new_resource_export' | 'new_resource_export.completed_at' | 'new_resource_export.created_at' | 'new_resource_export.download_url' | 'new_task' | 'new_task.created_by' | 'new_task.name' | 'new_task.resource_subtype' | 'new_task_template' | 'new_task_template.name' | 'resource_subtype' | 'status'>,  request: Request): GetJob200Response | Promise<GetJob200Response> | Observable<GetJob200Response>;

} 