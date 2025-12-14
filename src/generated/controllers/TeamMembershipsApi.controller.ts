import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TeamMembershipsApi } from '../api';
import { GetTeamMembership200Response, GetTeamMemberships200Response,  } from '../models';

@Controller()
export class TeamMembershipsApiController {
  constructor(private readonly teamMembershipsApi: TeamMembershipsApi) {}

  @Get('/team_memberships/:team_membership_gid')
  getTeamMembership(@Param('teamMembershipGid') teamMembershipGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'team' | 'team.name' | 'user' | 'user.name'>, @Req() request: Request): GetTeamMembership200Response | Promise<GetTeamMembership200Response> | Observable<GetTeamMembership200Response> {
    return this.teamMembershipsApi.getTeamMembership(teamMembershipGid, optPretty, optFields, request);
  }

  @Get('/team_memberships')
  getTeamMemberships(@Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('team') team: string, @Query('user') user: string, @Query('workspace') workspace: string, @Query('optFields') optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'offset' | 'path' | 'team' | 'team.name' | 'uri' | 'user' | 'user.name'>, @Req() request: Request): GetTeamMemberships200Response | Promise<GetTeamMemberships200Response> | Observable<GetTeamMemberships200Response> {
    return this.teamMembershipsApi.getTeamMemberships(optPretty, limit, offset, team, user, workspace, optFields, request);
  }

  @Get('/teams/:team_gid/team_memberships')
  getTeamMembershipsForTeam(@Param('teamGid') teamGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'offset' | 'path' | 'team' | 'team.name' | 'uri' | 'user' | 'user.name'>, @Req() request: Request): GetTeamMemberships200Response | Promise<GetTeamMemberships200Response> | Observable<GetTeamMemberships200Response> {
    return this.teamMembershipsApi.getTeamMembershipsForTeam(teamGid, optPretty, limit, offset, optFields, request);
  }

  @Get('/users/:user_gid/team_memberships')
  getTeamMembershipsForUser(@Param('userGid') userGid: string, @Query('workspace') workspace: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'offset' | 'path' | 'team' | 'team.name' | 'uri' | 'user' | 'user.name'>, @Req() request: Request): GetTeamMemberships200Response | Promise<GetTeamMemberships200Response> | Observable<GetTeamMemberships200Response> {
    return this.teamMembershipsApi.getTeamMembershipsForUser(userGid, workspace, optPretty, limit, offset, optFields, request);
  }

} 