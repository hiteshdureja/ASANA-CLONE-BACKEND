import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectMembershipsApi } from '../api';
import { GetProjectMembership200Response, GetProjectMembershipsForProject200Response,  } from '../models';

@Controller()
export class ProjectMembershipsApiController {
  constructor(private readonly projectMembershipsApi: ProjectMembershipsApi) {}

  @Get('/project_memberships/:project_membership_gid')
  getProjectMembership(@Param('projectMembershipGid') projectMembershipGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'access_level' | 'member' | 'member.name' | 'parent' | 'parent.name' | 'project' | 'project.name' | 'user' | 'user.name' | 'write_access'>, @Req() request: Request): GetProjectMembership200Response | Promise<GetProjectMembership200Response> | Observable<GetProjectMembership200Response> {
    return this.projectMembershipsApi.getProjectMembership(projectMembershipGid, optPretty, optFields, request);
  }

  @Get('/projects/:project_gid/project_memberships')
  getProjectMembershipsForProject(@Param('projectGid') projectGid: string, @Query('user') user: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'access_level' | 'member' | 'member.name' | 'offset' | 'parent' | 'parent.name' | 'path' | 'uri'>, @Req() request: Request): GetProjectMembershipsForProject200Response | Promise<GetProjectMembershipsForProject200Response> | Observable<GetProjectMembershipsForProject200Response> {
    return this.projectMembershipsApi.getProjectMembershipsForProject(projectGid, user, optPretty, limit, offset, optFields, request);
  }

} 