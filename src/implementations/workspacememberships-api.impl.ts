import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { WorkspaceMembershipsApi } from '../generated/api';
import {
  GetWorkspaceMembership200Response,
  GetWorkspaceMembershipsForUser200Response,
  WorkspaceMembershipCompact,
  NextPage,
} from '../generated/models';
import { WorkspaceMembership } from '../entities/membership.entity';
import { Workspace } from '../entities/workspace.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class WorkspaceMembershipsApiImpl extends WorkspaceMembershipsApi {
  constructor(
    @InjectRepository(WorkspaceMembership)
    private workspaceMembershipRepository: Repository<WorkspaceMembership>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async getWorkspaceMembership(
    workspaceMembershipGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetWorkspaceMembership200Response> {
    const membership = await this.workspaceMembershipRepository.findOne({
      where: { gid: workspaceMembershipGid },
      relations: ['workspace', 'user'],
    });

    if (!membership) {
      throw new NotFoundException(`Workspace membership with gid ${workspaceMembershipGid} not found`);
    }

    return {
      data: {
        gid: membership.gid,
        resource_type: 'workspace_membership',
        is_active: membership.isActive,
        is_admin: membership.isAdmin,
        is_guest: membership.isGuest,
        is_view_only: membership.isViewOnly,
        created_at: membership.createdAt.toISOString(),
        vacation_dates: membership.vacationDates,
        workspace: {
          gid: membership.workspace.gid,
          name: membership.workspace.name,
        },
        user: {
          gid: membership.user.gid,
          name: membership.user.name,
        },
      },
    };
  }

  async getWorkspaceMembershipsForUser(
    userGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetWorkspaceMembershipsForUser200Response> {
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    const query = this.workspaceMembershipRepository.createQueryBuilder('membership')
      .where('membership.user.id = :userId', { userId: user.id })
      .leftJoinAndSelect('membership.workspace', 'workspace')
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
        resource_type: 'workspace_membership',
        is_active: m.isActive,
        is_admin: m.isAdmin,
        is_guest: m.isGuest,
        is_view_only: m.isViewOnly,
        created_at: m.createdAt.toISOString(),
        vacation_dates: m.vacationDates,
        workspace: {
          gid: m.workspace.gid,
          name: m.workspace.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
      } as WorkspaceMembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }

  async getWorkspaceMembershipsForWorkspace(
    workspaceGid: string,
    user: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetWorkspaceMembershipsForUser200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const query = this.workspaceMembershipRepository.createQueryBuilder('membership')
      .where('membership.workspace.id = :workspaceId', { workspaceId: workspace.id })
      .leftJoinAndSelect('membership.workspace', 'workspace')
      .leftJoinAndSelect('membership.user', 'user');

    if (user) {
      query.andWhere('membership.user.gid = :userGid', { userGid: user });
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
        resource_type: 'workspace_membership',
        is_active: m.isActive,
        is_admin: m.isAdmin,
        is_guest: m.isGuest,
        is_view_only: m.isViewOnly,
        created_at: m.createdAt.toISOString(),
        vacation_dates: m.vacationDates,
        workspace: {
          gid: m.workspace.gid,
          name: m.workspace.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
      } as WorkspaceMembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }
}
