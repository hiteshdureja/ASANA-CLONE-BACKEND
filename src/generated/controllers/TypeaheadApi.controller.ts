import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TypeaheadApi } from '../api';
import { TypeaheadForWorkspace200Response,  } from '../models';

@Controller()
export class TypeaheadApiController {
  constructor(private readonly typeaheadApi: TypeaheadApi) {}

  @Get('/workspaces/:workspace_gid/typeahead')
  typeaheadForWorkspace(@Param('workspaceGid') workspaceGid: string, @Query('resourceType') resourceType: 'custom_field' | 'goal' | 'project' | 'project_template' | 'portfolio' | 'tag' | 'task' | 'team' | 'user', @Query('type') type: 'custom_field' | 'portfolio' | 'project' | 'tag' | 'task' | 'user', @Query('query') query: string, @Query('count') count: number, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'name'>, @Req() request: Request): TypeaheadForWorkspace200Response | Promise<TypeaheadForWorkspace200Response> | Observable<TypeaheadForWorkspace200Response> {
    return this.typeaheadApi.typeaheadForWorkspace(workspaceGid, resourceType, type, query, count, optPretty, optFields, request);
  }

} 