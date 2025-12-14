import { Team } from '../entities/team.entity';
import { TeamResponse, TeamRequest } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class TeamMapper {
  static toResponse(
    team: Team,
    optFields?: string[],
  ): TeamResponse {
    const response: TeamResponse = {
      gid: team.gid,
      resource_type: 'team',
      name: team.name,
      description: team.description,
    };

    if (team.workspace) {
      response.organization = {
        gid: team.workspace.gid,
        name: team.workspace.name,
      };
    }

    return filterFields(response, optFields) as TeamResponse;
  }

  static fromRequest(request: TeamRequest): Partial<Team> {
    return {
      name: request.name,
      description: request.description,
    };
  }
}

