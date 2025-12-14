import { Tag } from '../entities/tag.entity';
import { TagResponse } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class TagMapper {
  static toResponse(
    tag: Tag,
    optFields?: string[],
  ): TagResponse {
    const response: any = {
      gid: tag.gid,
      resource_type: 'tag',
      name: tag.name,
      color: tag.color as any,
      created_at: tag.createdAt.toISOString(),
    };

    if (tag.workspace) {
      response.workspace = {
        gid: tag.workspace.gid,
        name: tag.workspace.name,
      };
    }

    return filterFields(response, optFields) as TagResponse;
  }

  static fromRequest(request: any): Partial<Tag> {
    return {
      name: request.name,
      color: request.color,
    };
  }
}

