import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetUserTaskList200Response, } from '../models';


@Injectable()
export abstract class UserTaskListsApi {

  abstract getUserTaskList(userTaskListGid: string, optPretty: boolean, optFields: Array<'name' | 'owner' | 'workspace'>, request: Request): GetUserTaskList200Response | Promise<GetUserTaskList200Response> | Observable<GetUserTaskList200Response>;


  abstract getUserTaskListForUser(userGid: string, workspace: string, optPretty: boolean, optFields: Array<'name' | 'owner' | 'workspace'>, request: Request): GetUserTaskList200Response | Promise<GetUserTaskList200Response> | Observable<GetUserTaskList200Response>;

} 