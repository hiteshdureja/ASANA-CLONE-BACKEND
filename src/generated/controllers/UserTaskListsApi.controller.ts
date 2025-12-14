import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserTaskListsApi } from '../api';
import { GetUserTaskList200Response,  } from '../models';

@Controller()
export class UserTaskListsApiController {
  constructor(private readonly userTaskListsApi: UserTaskListsApi) {}

  @Get('/user_task_lists/:user_task_list_gid')
  getUserTaskList(@Param('userTaskListGid') userTaskListGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'name' | 'owner' | 'workspace'>, @Req() request: Request): GetUserTaskList200Response | Promise<GetUserTaskList200Response> | Observable<GetUserTaskList200Response> {
    return this.userTaskListsApi.getUserTaskList(userTaskListGid, optPretty, optFields, request);
  }

  @Get('/users/:user_gid/user_task_list')
  getUserTaskListForUser(@Param('userGid') userGid: string, @Query('workspace') workspace: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'name' | 'owner' | 'workspace'>, @Req() request: Request): GetUserTaskList200Response | Promise<GetUserTaskList200Response> | Observable<GetUserTaskList200Response> {
    return this.userTaskListsApi.getUserTaskListForUser(userGid, workspace, optPretty, optFields, request);
  }

} 