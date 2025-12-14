import { Body, Controller, Delete, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectTemplatesApi } from '../api';
import type { ApproveAccessRequest200Response, GetJob200Response, GetProjectTemplate200Response, GetProjectTemplates200Response, InstantiateProjectRequest,  } from '../models';

@Controller()
export class ProjectTemplatesApiController {
  constructor(private readonly projectTemplatesApi: ProjectTemplatesApi) {}

  @Delete('/project_templates/:project_template_gid')
  deleteProjectTemplate(@Param('projectTemplateGid') projectTemplateGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.projectTemplatesApi.deleteProjectTemplate(projectTemplateGid, optPretty, request);
  }

  @Get('/project_templates/:project_template_gid')
  getProjectTemplate(@Param('projectTemplateGid') projectTemplateGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'description' | 'html_description' | 'name' | 'owner' | 'public' | 'requested_dates' | 'requested_dates.description' | 'requested_dates.name' | 'requested_roles' | 'requested_roles.name' | 'team' | 'team.name'>, @Req() request: Request): GetProjectTemplate200Response | Promise<GetProjectTemplate200Response> | Observable<GetProjectTemplate200Response> {
    return this.projectTemplatesApi.getProjectTemplate(projectTemplateGid, optPretty, optFields, request);
  }

  @Get('/project_templates')
  getProjectTemplates(@Query('optPretty') optPretty: boolean, @Query('workspace') workspace: string, @Query('team') team: string, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'color' | 'description' | 'html_description' | 'name' | 'offset' | 'owner' | 'path' | 'public' | 'requested_dates' | 'requested_dates.description' | 'requested_dates.name' | 'requested_roles' | 'requested_roles.name' | 'team' | 'team.name' | 'uri'>, @Req() request: Request): GetProjectTemplates200Response | Promise<GetProjectTemplates200Response> | Observable<GetProjectTemplates200Response> {
    return this.projectTemplatesApi.getProjectTemplates(optPretty, workspace, team, limit, offset, optFields, request);
  }

  @Get('/teams/:team_gid/project_templates')
  getProjectTemplatesForTeam(@Param('teamGid') teamGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'color' | 'description' | 'html_description' | 'name' | 'offset' | 'owner' | 'path' | 'public' | 'requested_dates' | 'requested_dates.description' | 'requested_dates.name' | 'requested_roles' | 'requested_roles.name' | 'team' | 'team.name' | 'uri'>, @Req() request: Request): GetProjectTemplates200Response | Promise<GetProjectTemplates200Response> | Observable<GetProjectTemplates200Response> {
    return this.projectTemplatesApi.getProjectTemplatesForTeam(teamGid, optPretty, limit, offset, optFields, request);
  }

  @Post('/project_templates/:project_template_gid/instantiateProject')
  instantiateProject(@Param('projectTemplateGid') projectTemplateGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'new_graph_export' | 'new_graph_export.completed_at' | 'new_graph_export.created_at' | 'new_graph_export.download_url' | 'new_project' | 'new_project.name' | 'new_project_template' | 'new_project_template.name' | 'new_resource_export' | 'new_resource_export.completed_at' | 'new_resource_export.created_at' | 'new_resource_export.download_url' | 'new_task' | 'new_task.created_by' | 'new_task.name' | 'new_task.resource_subtype' | 'new_task_template' | 'new_task_template.name' | 'resource_subtype' | 'status'>, @Body() instantiateProjectRequest: InstantiateProjectRequest, @Req() request: Request): GetJob200Response | Promise<GetJob200Response> | Observable<GetJob200Response> {
    return this.projectTemplatesApi.instantiateProject(projectTemplateGid, optPretty, optFields, instantiateProjectRequest, request);
  }

} 