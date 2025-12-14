import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { ProjectMembershipsApi } from '../generated/api';
import {
  GetProjectMembership200Response,
  GetProjectMembershipsForProject200Response,
  ProjectMembershipCompact,
  NextPage,
} from '../generated/models';
import { ProjectMembership } from '../entities/membership.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ProjectMembershipsApiImpl extends ProjectMembershipsApi {
  constructor(
    @InjectRepository(ProjectMembership)
    private projectMembershipRepository: Repository<ProjectMembership>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async getProjectMembership(
    projectMembershipGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectMembership200Response> {
    const membership = await this.projectMembershipRepository.findOne({
      where: { gid: projectMembershipGid },
      relations: ['project', 'user'],
    });

    if (!membership) {
      throw new NotFoundException(`Project membership with gid ${projectMembershipGid} not found`);
    }

    return {
      data: {
        gid: membership.gid,
        resource_type: 'project_membership',
        access_level: membership.accessLevel as any,
        write_access: membership.writeAccess ? 'full_write' : 'read_only' as any,
        project: {
          gid: membership.project.gid,
          name: membership.project.name,
        },
        user: {
          gid: membership.user.gid,
          name: membership.user.name,
        },
        member: {
          gid: membership.user.gid,
          name: membership.user.name,
        },
        parent: {
          gid: membership.project.gid,
          name: membership.project.name,
        },
      },
    };
  }

  async getProjectMembershipsForProject(
    projectGid: string,
    user: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectMembershipsForProject200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const query = this.projectMembershipRepository.createQueryBuilder('membership')
      .where('membership.project.id = :projectId', { projectId: project.id })
      .leftJoinAndSelect('membership.project', 'project')
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
        resource_type: 'project_membership',
        access_level: m.accessLevel as any,
        write_access: m.writeAccess,
        project: {
          gid: m.project.gid,
          name: m.project.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
        member: {
          gid: m.user.gid,
          name: m.user.name,
        },
        parent: {
          gid: m.project.gid,
          name: m.project.name,
        },
      } as ProjectMembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }
}
