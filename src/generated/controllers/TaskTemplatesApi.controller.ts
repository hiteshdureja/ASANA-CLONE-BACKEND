import { Body, Controller, Delete, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskTemplatesApi } from '../api';
import type { ApproveAccessRequest200Response, GetJob200Response, GetTaskTemplate200Response, GetTaskTemplates200Response, InstantiateTaskRequest,  } from '../models';

@Controller()
export class TaskTemplatesApiController {
  constructor(private readonly taskTemplatesApi: TaskTemplatesApi) {}

  @Delete('/task_templates/:task_template_gid')
  deleteTaskTemplate(@Param('taskTemplateGid') taskTemplateGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.taskTemplatesApi.deleteTaskTemplate(taskTemplateGid, optPretty, request);
  }

  @Get('/task_templates/:task_template_gid')
  getTaskTemplate(@Param('taskTemplateGid') taskTemplateGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'created_by' | 'name' | 'project' | 'template'>, @Req() request: Request): GetTaskTemplate200Response | Promise<GetTaskTemplate200Response> | Observable<GetTaskTemplate200Response> {
    return this.taskTemplatesApi.getTaskTemplate(taskTemplateGid, optPretty, optFields, request);
  }

  @Get('/task_templates')
  getTaskTemplates(@Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('project') project: string, @Query('optFields') optFields: Array<'created_at' | 'created_by' | 'name' | 'project' | 'template'>, @Req() request: Request): GetTaskTemplates200Response | Promise<GetTaskTemplates200Response> | Observable<GetTaskTemplates200Response> {
    return this.taskTemplatesApi.getTaskTemplates(optPretty, limit, offset, project, optFields, request);
  }

  @Post('/task_templates/:task_template_gid/instantiateTask')
  instantiateTask(@Param('taskTemplateGid') taskTemplateGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'new_graph_export' | 'new_graph_export.completed_at' | 'new_graph_export.created_at' | 'new_graph_export.download_url' | 'new_project' | 'new_project.name' | 'new_project_template' | 'new_project_template.name' | 'new_resource_export' | 'new_resource_export.completed_at' | 'new_resource_export.created_at' | 'new_resource_export.download_url' | 'new_task' | 'new_task.created_by' | 'new_task.name' | 'new_task.resource_subtype' | 'new_task_template' | 'new_task_template.name' | 'resource_subtype' | 'status'>, @Body() instantiateTaskRequest: InstantiateTaskRequest, @Req() request: Request): GetJob200Response | Promise<GetJob200Response> | Observable<GetJob200Response> {
    return this.taskTemplatesApi.instantiateTask(taskTemplateGid, optPretty, optFields, instantiateTaskRequest, request);
  }

} 