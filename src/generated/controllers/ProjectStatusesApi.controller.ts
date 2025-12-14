import { Body, Controller, Delete, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectStatusesApi } from '../api';
import type { ApproveAccessRequest200Response, CreateProjectStatusForProjectRequest, GetProjectStatus200Response, GetProjectStatusesForProject200Response,  } from '../models';

@Controller()
export class ProjectStatusesApiController {
  constructor(private readonly projectStatusesApi: ProjectStatusesApi) {}

  @Post('/projects/:project_gid/project_statuses')
  createProjectStatusForProject(@Param('projectGid') projectGid: string, @Body() createProjectStatusForProjectRequest: CreateProjectStatusForProjectRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'author' | 'author.name' | 'color' | 'created_at' | 'created_by' | 'created_by.name' | 'html_text' | 'modified_at' | 'text' | 'title'>, @Req() request: Request): GetProjectStatus200Response | Promise<GetProjectStatus200Response> | Observable<GetProjectStatus200Response> {
    return this.projectStatusesApi.createProjectStatusForProject(projectGid, createProjectStatusForProjectRequest, optPretty, optFields, request);
  }

  @Delete('/project_statuses/:project_status_gid')
  deleteProjectStatus(@Param('projectStatusGid') projectStatusGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.projectStatusesApi.deleteProjectStatus(projectStatusGid, optPretty, request);
  }

  @Get('/project_statuses/:project_status_gid')
  getProjectStatus(@Param('projectStatusGid') projectStatusGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'author' | 'author.name' | 'color' | 'created_at' | 'created_by' | 'created_by.name' | 'html_text' | 'modified_at' | 'text' | 'title'>, @Req() request: Request): GetProjectStatus200Response | Promise<GetProjectStatus200Response> | Observable<GetProjectStatus200Response> {
    return this.projectStatusesApi.getProjectStatus(projectStatusGid, optPretty, optFields, request);
  }

  @Get('/projects/:project_gid/project_statuses')
  getProjectStatusesForProject(@Param('projectGid') projectGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'author' | 'author.name' | 'color' | 'created_at' | 'created_by' | 'created_by.name' | 'html_text' | 'modified_at' | 'offset' | 'path' | 'text' | 'title' | 'uri'>, @Req() request: Request): GetProjectStatusesForProject200Response | Promise<GetProjectStatusesForProject200Response> | Observable<GetProjectStatusesForProject200Response> {
    return this.projectStatusesApi.getProjectStatusesForProject(projectGid, optPretty, limit, offset, optFields, request);
  }

} 