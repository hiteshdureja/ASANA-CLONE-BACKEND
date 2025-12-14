import { Story } from '../entities/story.entity';
import { StoryResponse } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class StoryMapper {
  static toResponse(
    story: Story,
    optFields?: string[],
  ): StoryResponse {
    const response: any = {
      gid: story.gid,
      resource_type: 'story',
      text: story.text,
      html_text: story.htmlText,
      resource_subtype: story.resourceSubtype as any,
      is_pinned: story.isPinned,
      is_edited: story.isEdited,
      is_editable: story.isEditable,
      created_at: story.createdAt.toISOString(),
    };

    if (story.createdBy) {
      response.created_by = {
        gid: story.createdBy.gid,
        name: story.createdBy.name,
      };
    }

    if (story.task) {
      response.target = {
        gid: story.task.gid,
        name: story.task.name,
        resource_subtype: story.task.resourceSubtype as any,
        created_by: story.task.createdBy ? {
          gid: story.task.createdBy.gid,
          resource_type: 'user',
        } : undefined,
      };
    }

    return filterFields(response, optFields) as StoryResponse;
  }

  static fromRequest(request: any): Partial<Story> {
    return {
      text: request.text,
      htmlText: request.html_text,
      resourceSubtype: request.resource_subtype,
      isPinned: request.is_pinned,
    };
  }
}

