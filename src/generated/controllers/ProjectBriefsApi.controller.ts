import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectBriefsApi } from '../api';
import type { ApproveAccessRequest200Response, GetProjectBrief200Response, UpdateProjectBriefRequest,  } from '../models';

@Controller()
export class ProjectBriefsApiController {
  constructor(private readonly projectBriefsApi: ProjectBriefsApi) {}

  @Post('/projects/:project_gid/project_briefs')
  createProjectBrief(@Param('projectGid') projectGid: string, @Body() updateProjectBriefRequest: UpdateProjectBriefRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'html_text' | 'permalink_url' | 'project' | 'project.name' | 'text' | 'title'>, @Req() request: Request): GetProjectBrief200Response | Promise<GetProjectBrief200Response> | Observable<GetProjectBrief200Response> {
    return this.projectBriefsApi.createProjectBrief(projectGid, updateProjectBriefRequest, optPretty, optFields, request);
  }

  @Delete('/project_briefs/:project_brief_gid')
  deleteProjectBrief(@Param('projectBriefGid') projectBriefGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.projectBriefsApi.deleteProjectBrief(projectBriefGid, optPretty, request);
  }

  @Get('/project_briefs/:project_brief_gid')
  getProjectBrief(@Param('projectBriefGid') projectBriefGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'html_text' | 'permalink_url' | 'project' | 'project.name' | 'text' | 'title'>, @Req() request: Request): GetProjectBrief200Response | Promise<GetProjectBrief200Response> | Observable<GetProjectBrief200Response> {
    return this.projectBriefsApi.getProjectBrief(projectBriefGid, optPretty, optFields, request);
  }

  @Put('/project_briefs/:project_brief_gid')
  updateProjectBrief(@Param('projectBriefGid') projectBriefGid: string, @Body() updateProjectBriefRequest: UpdateProjectBriefRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'html_text' | 'permalink_url' | 'project' | 'project.name' | 'text' | 'title'>, @Req() request: Request): GetProjectBrief200Response | Promise<GetProjectBrief200Response> | Observable<GetProjectBrief200Response> {
    return this.projectBriefsApi.updateProjectBrief(projectBriefGid, updateProjectBriefRequest, optPretty, optFields, request);
  }

} 