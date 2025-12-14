import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetTeamMembership200Response, GetTeamMemberships200Response,  } from '../models';


@Injectable()
export abstract class TeamMembershipsApi {

  abstract getTeamMembership(teamMembershipGid: string, optPretty: boolean, optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'team' | 'team.name' | 'user' | 'user.name'>,  request: Request): GetTeamMembership200Response | Promise<GetTeamMembership200Response> | Observable<GetTeamMembership200Response>;


  abstract getTeamMemberships(optPretty: boolean, limit: number, offset: string, team: string, user: string, workspace: string, optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'offset' | 'path' | 'team' | 'team.name' | 'uri' | 'user' | 'user.name'>,  request: Request): GetTeamMemberships200Response | Promise<GetTeamMemberships200Response> | Observable<GetTeamMemberships200Response>;


  abstract getTeamMembershipsForTeam(teamGid: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'offset' | 'path' | 'team' | 'team.name' | 'uri' | 'user' | 'user.name'>,  request: Request): GetTeamMemberships200Response | Promise<GetTeamMemberships200Response> | Observable<GetTeamMemberships200Response>;


  abstract getTeamMembershipsForUser(userGid: string, workspace: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'is_admin' | 'is_guest' | 'is_limited_access' | 'offset' | 'path' | 'team' | 'team.name' | 'uri' | 'user' | 'user.name'>,  request: Request): GetTeamMemberships200Response | Promise<GetTeamMemberships200Response> | Observable<GetTeamMemberships200Response>;

} 