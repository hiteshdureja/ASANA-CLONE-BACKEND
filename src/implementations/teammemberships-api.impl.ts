import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { TeamMembershipsApi } from '../generated/api';
import {
  GetTeamMembership200Response,
  GetTeamMemberships200Response,
  TeamMembershipCompact,
  NextPage,
} from '../generated/models';
import { TeamMembership } from '../entities/membership.entity';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TeamMembershipsApiImpl extends TeamMembershipsApi {
  constructor(
    @InjectRepository(TeamMembership)
    private teamMembershipRepository: Repository<TeamMembership>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async getTeamMembership(
    teamMembershipGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamMembership200Response> {
    const membership = await this.teamMembershipRepository.findOne({
      where: { gid: teamMembershipGid },
      relations: ['team', 'user'],
    });

    if (!membership) {
      throw new NotFoundException(`Team membership with gid ${teamMembershipGid} not found`);
    }

    return {
      data: {
        gid: membership.gid,
        resource_type: 'team_membership',
        is_admin: membership.isAdmin,
        is_guest: membership.isGuest,
        is_limited_access: membership.isLimitedAccess,
        team: {
          gid: membership.team.gid,
          name: membership.team.name,
        },
        user: {
          gid: membership.user.gid,
          name: membership.user.name,
        },
      },
    };
  }

  async getTeamMemberships(
    optPretty: boolean,
    limit: number,
    offset: string,
    team: string,
    user: string,
    workspace: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamMemberships200Response> {
    const query = this.teamMembershipRepository.createQueryBuilder('membership')
      .leftJoinAndSelect('membership.team', 'team')
      .leftJoinAndSelect('membership.user', 'user');

    if (team) {
      query.andWhere('membership.team.gid = :teamGid', { teamGid: team });
    }

    if (user) {
      query.andWhere('membership.user.gid = :userGid', { userGid: user });
    }

    if (workspace) {
      query.andWhere('team.workspace.gid = :workspaceGid', { workspaceGid: workspace });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [memberships, total] = await query.getManyAndCount();

    return {
      data: memberships.map(m => ({
        gid: m.gid,
        resource_type: 'team_membership',
        is_admin: m.isAdmin,
        is_guest: m.isGuest,
        is_limited_access: m.isLimitedAccess,
        team: {
          gid: m.team.gid,
          name: m.team.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
      } as TeamMembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }

  async getTeamMembershipsForTeam(
    teamGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamMemberships200Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const query = this.teamMembershipRepository.createQueryBuilder('membership')
      .where('membership.team.id = :teamId', { teamId: team.id })
      .leftJoinAndSelect('membership.team', 'team')
      .leftJoinAndSelect('membership.user', 'user');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [memberships, total] = await query.getManyAndCount();

    return {
      data: memberships.map(m => ({
        gid: m.gid,
        resource_type: 'team_membership',
        is_admin: m.isAdmin,
        is_guest: m.isGuest,
        is_limited_access: m.isLimitedAccess,
        team: {
          gid: m.team.gid,
          name: m.team.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
      } as TeamMembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }

  async getTeamMembershipsForUser(
    userGid: string,
    workspace: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTeamMemberships200Response> {
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    const query = this.teamMembershipRepository.createQueryBuilder('membership')
      .where('membership.user.id = :userId', { userId: user.id })
      .leftJoinAndSelect('membership.team', 'team')
      .leftJoinAndSelect('membership.user', 'user');

    if (workspace) {
      query.andWhere('team.workspace.gid = :workspaceGid', { workspaceGid: workspace });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [memberships, total] = await query.getManyAndCount();

    return {
      data: memberships.map(m => ({
        gid: m.gid,
        resource_type: 'team_membership',
        is_admin: m.isAdmin,
        is_guest: m.isGuest,
        is_limited_access: m.isLimitedAccess,
        team: {
          gid: m.team.gid,
          name: m.team.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
      } as TeamMembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }
}
