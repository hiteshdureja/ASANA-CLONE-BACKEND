import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetProjectMembership200Response, GetProjectMembershipsForProject200Response,  } from '../models';


@Injectable()
export abstract class ProjectMembershipsApi {

  abstract getProjectMembership(projectMembershipGid: string, optPretty: boolean, optFields: Array<'access_level' | 'member' | 'member.name' | 'parent' | 'parent.name' | 'project' | 'project.name' | 'user' | 'user.name' | 'write_access'>,  request: Request): GetProjectMembership200Response | Promise<GetProjectMembership200Response> | Observable<GetProjectMembership200Response>;


  abstract getProjectMembershipsForProject(projectGid: string, user: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'access_level' | 'member' | 'member.name' | 'offset' | 'parent' | 'parent.name' | 'path' | 'uri'>,  request: Request): GetProjectMembershipsForProject200Response | Promise<GetProjectMembershipsForProject200Response> | Observable<GetProjectMembershipsForProject200Response>;

} 