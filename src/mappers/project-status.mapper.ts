import { ProjectStatus } from '../entities/project-status.entity';
import { ProjectStatusResponse } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class ProjectStatusMapper {
  static toResponse(
    status: ProjectStatus,
    optFields?: string[],
  ): ProjectStatusResponse {
    const response: ProjectStatusResponse = {
      gid: status.gid,
      resource_type: 'project_status',
      title: status.title,
      text: status.text,
      html_text: status.htmlText,
      color: status.color as any,
      created_at: status.createdAt.toISOString(),
      modified_at: status.modifiedAt.toISOString(),
    };

    if (status.author) {
      response.author = {
        gid: status.author.gid,
        name: status.author.name,
      };
    }

    if (status.createdBy) {
      response.created_by = {
        gid: status.createdBy.gid,
        name: status.createdBy.name,
      };
    }

    return filterFields(response, optFields) as ProjectStatusResponse;
  }

  static fromRequest(request: any): Partial<ProjectStatus> {
    return {
      title: request.title,
      text: request.text,
      htmlText: request.html_text,
      color: request.color,
    };
  }
}

