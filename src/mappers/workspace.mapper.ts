import { Workspace } from '../entities/workspace.entity';
import { WorkspaceResponse } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class WorkspaceMapper {
  static toResponse(
    workspace: Workspace,
    optFields?: string[],
  ): WorkspaceResponse {
    const response: WorkspaceResponse = {
      gid: workspace.gid,
      resource_type: 'workspace',
      name: workspace.name,
      is_organization: workspace.isOrganization,
      email_domains: workspace.emailDomains,
    };

    return filterFields(response, optFields) as WorkspaceResponse;
  }
}

