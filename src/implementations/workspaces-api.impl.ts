import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Observable } from 'rxjs';
import { WorkspacesApi } from '../generated/api';
import {
  AddUserForWorkspace200Response,
  AddUserForWorkspaceRequest,
  ApproveAccessRequest200Response,
  GetEvents200Response,
  GetWorkspace200Response,
  GetWorkspaces200Response,
  RemoveUserForWorkspaceRequest,
  UpdateWorkspaceRequest,
  WorkspaceCompact,
  NextPage,
} from '../generated/models';
import { Workspace } from '../entities/workspace.entity';
import { User } from '../entities/user.entity';
import { WorkspaceMapper } from '../mappers/workspace.mapper';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class WorkspacesApiImpl extends WorkspacesApi {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async addUserForWorkspace(
    workspaceGid: string,
    addUserForWorkspaceRequest: AddUserForWorkspaceRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<AddUserForWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
      relations: ['members'],
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const userGid = addUserForWorkspaceRequest?.data?.user;
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    if (!workspace.members.some(m => m.gid === user.gid)) {
      workspace.members.push(user);
      await this.workspaceRepository.save(workspace);
    }

    return {
      data: {
        gid: user.gid,
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    };
  }

  async getWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    return {
      data: WorkspaceMapper.toResponse(workspace, optFields),
    };
  }

  async getWorkspaceEvents(
    workspaceGid: string,
    optPretty: boolean,
    sync: string,
    request: Request,
  ): Promise<GetEvents200Response> {
    // Events implementation - placeholder for now
    return {
      data: [],
      sync: generateGid('sync'),
      has_more: false,
    };
  }

  async getWorkspaces(
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetWorkspaces200Response> {
    const query = this.workspaceRepository.createQueryBuilder('workspace');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [workspaces, total] = await query.getManyAndCount();

    return {
      data: workspaces.map(w => ({
        gid: w.gid,
        resource_type: 'workspace',
        name: w.name,
        is_organization: w.isOrganization,
        email_domains: w.emailDomains,
      } as WorkspaceCompact)),
      next_page: offsetNum + workspaces.length < total
        ? { offset: String(offsetNum + workspaces.length) }
        : null,
    };
  }

  async removeUserForWorkspace(
    workspaceGid: string,
    removeUserForWorkspaceRequest: RemoveUserForWorkspaceRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
      relations: ['members'],
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const userGid = removeUserForWorkspaceRequest?.data?.user;
    workspace.members = workspace.members.filter(m => m.gid !== userGid);
    await this.workspaceRepository.save(workspace);

    return { data: {} };
  }

  async updateWorkspace(
    workspaceGid: string,
    updateWorkspaceRequest: UpdateWorkspaceRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const updateData = (updateWorkspaceRequest.data || {}) as any;
    if (updateData.name !== undefined) workspace.name = updateData.name;
    if (updateData.is_organization !== undefined) workspace.isOrganization = updateData.is_organization;
    if (updateData.email_domains !== undefined) workspace.emailDomains = updateData.email_domains;

    await this.workspaceRepository.save(workspace);

    return {
      data: WorkspaceMapper.toResponse(workspace, optFields),
    };
  }
}
