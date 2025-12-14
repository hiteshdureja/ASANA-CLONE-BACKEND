import { Section } from '../entities/section.entity';
import { SectionResponse, SectionRequest } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class SectionMapper {
  static toResponse(
    section: Section,
    optFields?: string[],
  ): SectionResponse {
    const response: SectionResponse = {
      gid: section.gid,
      resource_type: 'section',
      name: section.name,
      created_at: section.createdAt.toISOString(),
    };

    if (section.project) {
      response.project = {
        gid: section.project.gid,
        name: section.project.name,
      };
    }

    return filterFields(response, optFields) as SectionResponse;
  }

  static fromRequest(request: SectionRequest): Partial<Section> {
    return {
      name: request.name,
    };
  }
}

