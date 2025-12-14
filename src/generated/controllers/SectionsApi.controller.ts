import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SectionsApi } from '../api';
import type { AddTaskForSectionRequest, ApproveAccessRequest200Response, GetSection200Response, GetSectionsForProject200Response, InsertSectionForProjectRequest, UpdateSectionRequest,  } from '../models';

@Controller()
export class SectionsApiController {
  constructor(private readonly sectionsApi: SectionsApi) {}

  @Post('/sections/:section_gid/addTask')
  addTaskForSection(@Param('sectionGid') sectionGid: string, @Query('optPretty') optPretty: boolean, @Body() addTaskForSectionRequest: AddTaskForSectionRequest, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.sectionsApi.addTaskForSection(sectionGid, optPretty, addTaskForSectionRequest, request);
  }

  @Post('/projects/:project_gid/sections')
  createSectionForProject(@Param('projectGid') projectGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'name' | 'project' | 'project.name' | 'projects' | 'projects.name'>, @Body() updateSectionRequest: UpdateSectionRequest, @Req() request: Request): GetSection200Response | Promise<GetSection200Response> | Observable<GetSection200Response> {
    return this.sectionsApi.createSectionForProject(projectGid, optPretty, optFields, updateSectionRequest, request);
  }

  @Delete('/sections/:section_gid')
  deleteSection(@Param('sectionGid') sectionGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.sectionsApi.deleteSection(sectionGid, optPretty, request);
  }

  @Get('/sections/:section_gid')
  getSection(@Param('sectionGid') sectionGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'name' | 'project' | 'project.name' | 'projects' | 'projects.name'>, @Req() request: Request): GetSection200Response | Promise<GetSection200Response> | Observable<GetSection200Response> {
    return this.sectionsApi.getSection(sectionGid, optPretty, optFields, request);
  }

  @Get('/projects/:project_gid/sections')
  getSectionsForProject(@Param('projectGid') projectGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'created_at' | 'name' | 'offset' | 'path' | 'project' | 'project.name' | 'projects' | 'projects.name' | 'uri'>, @Req() request: Request): GetSectionsForProject200Response | Promise<GetSectionsForProject200Response> | Observable<GetSectionsForProject200Response> {
    return this.sectionsApi.getSectionsForProject(projectGid, optPretty, limit, offset, optFields, request);
  }

  @Post('/projects/:project_gid/sections/insert')
  insertSectionForProject(@Param('projectGid') projectGid: string, @Query('optPretty') optPretty: boolean, @Body() insertSectionForProjectRequest: InsertSectionForProjectRequest, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.sectionsApi.insertSectionForProject(projectGid, optPretty, insertSectionForProjectRequest, request);
  }

  @Put('/sections/:section_gid')
  updateSection(@Param('sectionGid') sectionGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'created_at' | 'name' | 'project' | 'project.name' | 'projects' | 'projects.name'>, @Body() updateSectionRequest: UpdateSectionRequest, @Req() request: Request): GetSection200Response | Promise<GetSection200Response> | Observable<GetSection200Response> {
    return this.sectionsApi.updateSection(sectionGid, optPretty, optFields, updateSectionRequest, request);
  }

} 