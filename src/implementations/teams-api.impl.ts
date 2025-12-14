import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Observable } from 'rxjs';
import { TeamsApi } from '../generated/api';
import {
  AddUserForTeamRequest,
  ApproveAccessRequest200Response,
  CreateTeam201Response,
  CreateTeamRequest,
  GetTeamMembership200Response,
  GetTeamsForWorkspace200Response,
  RemoveUserForTeamRequest,
  TeamCompact,
  NextPage,
} from '../generated/models';
import { Team } from '../entities/team.entity';
import { Workspace } from '../entities/workspace.entity';
import { User } from '../entities/user.entity';
import { TeamMapper } from '../mappers/team.mapper';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class TeamsApiImpl extends TeamsApi {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async addUserForTeam(
    teamGid: string,
    addUserForTeamRequest: AddUserForTeamRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamMembership200Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
      relations: ['members'],
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const userGid = addUserForTeamRequest?.data?.user;
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    if (!team.members.some(m => m.gid === user.gid)) {
      team.members.push(user);
      await this.teamRepository.save(team);
    }

    return {
      data: {
        gid: generateGid('team_membership'),
        resource_type: 'team_membership',
        user: {
          gid: user.gid,
          name: user.name,
        },
        team: {
          gid: team.gid,
          name: team.name,
        },
        is_admin: false,
        is_guest: false,
        is_limited_access: false,
      },
    } as any;
  }

  async createTeam(
    createTeamRequest: CreateTeamRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTeam201Response> {
    const teamData = TeamMapper.fromRequest(createTeamRequest.data || {});
    teamData.gid = generateGid('team')
    if (!teamData.name) {
      throw new BadRequestException('Team name is required');
    }

    if (createTeamRequest.data?.organization) {
      const workspace = await this.workspaceRepository.findOne({
        where: { gid: createTeamRequest.data.organization },
      });
      if (!workspace) {
        throw new NotFoundException(`Workspace with gid ${createTeamRequest.data.organization} not found`);
      }
      teamData.workspace = workspace;
    }

    const team = this.teamRepository.create(teamData);
    const savedTeam = await this.teamRepository.save(team);

    const teamWithRelations = await this.teamRepository.findOne({
      where: { gid: savedTeam.gid },
      relations: ['workspace', 'members'],
    });

    if (!teamWithRelations) {
      throw new NotFoundException(`Team with gid ${savedTeam.gid} not found`);
    }

    return {
      data: TeamMapper.toResponse(teamWithRelations, optFields),
    };
  }

  async getTeam(
    teamGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTeam201Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
      relations: ['workspace', 'members'],
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    return {
      data: TeamMapper.toResponse(team, optFields),
    };
  }

  async getTeamsForUser(
    userGid: string,
    organization: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamsForWorkspace200Response> {
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
      relations: ['workspaces'],
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    const query = this.teamRepository.createQueryBuilder('team')
      .innerJoin('team.members', 'member', 'member.gid = :userGid', { userGid });

    if (organization) {
      query.andWhere('team.workspace.gid = :organization', { organization });
      query.leftJoinAndSelect('team.workspace', 'workspace');
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    query.leftJoinAndSelect('team.members', 'members');

    const [teams, total] = await query.getManyAndCount();

    return {
      data: teams.map(t => ({
        gid: t.gid,
        resource_type: 'team',
        name: t.name,
        description: t.description,
        organization: t.workspace ? {
          gid: t.workspace.gid,
          name: t.workspace.name,
        } : undefined,
      } as TeamCompact)),
      next_page: offsetNum + teams.length < total
        ? { offset: String(offsetNum + teams.length) }
        : null,
    };
  }

  async getTeamsForWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamsForWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const query = this.teamRepository.createQueryBuilder('team')
      .where('team.workspace.id = :workspaceId', { workspaceId: workspace.id })
      .leftJoinAndSelect('team.members', 'members')
      .leftJoinAndSelect('team.workspace', 'workspace');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [teams, total] = await query.getManyAndCount();

    return {
      data: teams.map(t => ({
        gid: t.gid,
        resource_type: 'team',
        name: t.name,
        description: t.description,
        organization: {
          gid: t.workspace.gid,
          name: t.workspace.name,
        },
      } as TeamCompact)),
      next_page: offsetNum + teams.length < total
        ? { offset: String(offsetNum + teams.length) }
        : null,
    };
  }

  async removeUserForTeam(
    teamGid: string,
    removeUserForTeamRequest: RemoveUserForTeamRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
      relations: ['members'],
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const userGid = removeUserForTeamRequest?.data?.user;
    team.members = team.members.filter(m => m.gid !== userGid);
    await this.teamRepository.save(team);

    return { data: {} };
  }

  async updateTeam(
    teamGid: string,
    createTeamRequest: CreateTeamRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTeam201Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
      relations: ['workspace', 'members'],
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const updateData = createTeamRequest.data || {};
    if (updateData.name !== undefined) team.name = updateData.name;
    if (updateData.description !== undefined) team.description = updateData.description;

    await this.teamRepository.save(team);

    return {
      data: TeamMapper.toResponse(team, optFields),
    };
  }
}
