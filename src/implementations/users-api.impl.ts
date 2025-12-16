import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Observable } from 'rxjs';
import { UsersApi } from '../generated/api';
import {
  GetFavoritesForUser200Response,
  GetUser200Response,
  GetUsers200Response,
  GetUsersForTeam200Response,
  UpdateUserRequest,
  UserCompact,
  NextPage,
} from '../generated/models';
import { User } from '../entities/user.entity';
import { Workspace } from '../entities/workspace.entity';
import { Team } from '../entities/team.entity';
import { UserMapper } from '../mappers/user.mapper';
import { generateGid } from '../utils/gid.util';
import { generateNextPage } from '../utils/pagination.util';

@Injectable()
export class UsersApiImpl extends UsersApi {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {
    super();
  }

  async getFavoritesForUser(
    userGid: string,
    resourceType: 'portfolio' | 'project' | 'tag' | 'task' | 'user' | 'project_template',
    workspace: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetFavoritesForUser200Response> {
    // Favorites implementation - placeholder for now
    return {
      data: [],
      next_page: null,
    };
  }

  async getUser(
    userGid: string,
    optPretty: boolean,
    workspace: string,
    optFields: any[],
    request: Request,
  ): Promise<GetUser200Response> {
    let user: User | null = null;
    if (userGid === 'me') {
      const users = await this.userRepository.find({ take: 1, relations: ['workspaces'] });
      user = users[0] || null;
    } else {
      user = await this.userRepository.findOne({
        where: { gid: userGid },
        relations: ['workspaces'],
      });
    }

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    return {
      data: UserMapper.toResponse(user, optFields),
    };
  }

  async getUserForWorkspace(
    workspaceGid: string,
    userGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetUser200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
      relations: ['members'],
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const user = workspace.members.find(m => m.gid === userGid);
    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found in workspace ${workspaceGid}`);
    }

    const fullUser = await this.userRepository.findOne({
      where: { gid: userGid },
      relations: ['workspaces'],
    });

    if (!fullUser) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    return {
      data: UserMapper.toResponse(fullUser, optFields),
    };
  }

  async getUsers(
    workspace: string,
    team: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetUsers200Response> {
    const query = this.userRepository.createQueryBuilder('user');

    if (workspace) {
      query.innerJoin('user.workspaces', 'workspace', 'workspace.gid = :workspaceGid', { workspaceGid: workspace });
      query.leftJoinAndSelect('user.workspaces', 'workspaces');
    }

    if (team) {
      query.innerJoin('user.workspaces', 'team', 'team.gid = :teamGid', { teamGid: team });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [users, total] = await query.getManyAndCount();
    const limitNum = limit || 100;

    const nextPage = generateNextPage(
      request as any,
      offsetNum,
      limitNum,
      total,
      offsetNum + users.length < total,
    );

    return {
      data: users.map(u => UserMapper.toResponse(u, optFields)),
      next_page: nextPage,
    };
  }

  async getUsersForTeam(
    teamGid: string,
    optPretty: boolean,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetUsersForTeam200Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
      relations: ['members'],
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const users = team.members.slice(offsetNum);

    return {
      data: users.map(u => ({
        gid: u.gid,
        resource_type: 'user',
        name: u.name,
        email: u.email,
        photo: u.photo,
      } as UserCompact)),
    };
  }

  async getUsersForWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetUsersForTeam200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
      relations: ['members'],
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const users = workspace.members.slice(offsetNum);

    return {
      data: users.map(u => ({
        gid: u.gid,
        resource_type: 'user',
        name: u.name,
        email: u.email,
        photo: u.photo,
      } as UserCompact)),
    };
  }

  async updateUser(
    userGid: string,
    updateUserRequest: UpdateUserRequest,
    optPretty: boolean,
    workspace: string,
    optFields: any[],
    request: Request,
  ): Promise<GetUser200Response> {
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
      relations: ['workspaces'],
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    const updateData = (updateUserRequest.data || {}) as any;
    if (updateData.name !== undefined) user.name = updateData.name;
    if (updateData.photo !== undefined) user.photo = updateData.photo;

    await this.userRepository.save(user);

    return {
      data: UserMapper.toResponse(user, optFields),
    };
  }

  async updateUserForWorkspace(
    workspaceGid: string,
    userGid: string,
    updateUserRequest: UpdateUserRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetUser200Response> {
    return this.updateUser(userGid, updateUserRequest, optPretty, workspaceGid, optFields, request);
  }
}
