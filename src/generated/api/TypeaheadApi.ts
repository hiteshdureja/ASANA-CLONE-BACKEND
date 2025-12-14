import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TypeaheadForWorkspace200Response,  } from '../models';


@Injectable()
export abstract class TypeaheadApi {

  abstract typeaheadForWorkspace(workspaceGid: string, resourceType: 'custom_field' | 'goal' | 'project' | 'project_template' | 'portfolio' | 'tag' | 'task' | 'team' | 'user', type: 'custom_field' | 'portfolio' | 'project' | 'tag' | 'task' | 'user', query: string, count: number, optPretty: boolean, optFields: Array<'name'>,  request: Request): TypeaheadForWorkspace200Response | Promise<TypeaheadForWorkspace200Response> | Observable<TypeaheadForWorkspace200Response>;

} 