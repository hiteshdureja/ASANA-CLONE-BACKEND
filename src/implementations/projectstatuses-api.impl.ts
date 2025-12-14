import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { ProjectStatusesApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  CreateProjectStatusForProjectRequest,
  GetProjectStatus200Response,
  GetProjectStatusesForProject200Response,
  ProjectStatusCompact,
  NextPage,
} from '../generated/models';
import { ProjectStatus } from '../entities/project-status.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { ProjectStatusMapper } from '../mappers/project-status.mapper';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class ProjectStatusesApiImpl extends ProjectStatusesApi {
  constructor(
    @InjectRepository(ProjectStatus)
    private projectStatusRepository: Repository<ProjectStatus>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async createProjectStatusForProject(
    projectGid: string,
    createProjectStatusForProjectRequest: CreateProjectStatusForProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectStatus200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const statusData = ProjectStatusMapper.fromRequest(createProjectStatusForProjectRequest.data || {});

    if (!statusData.title) {
      throw new BadRequestException('Status title is required');
    }

    statusData.project = project;
    statusData.isCurrent = true;

    // Set previous statuses to not current
    await this.projectStatusRepository.update(
      { project: { id: project.id }, isCurrent: true },
      { isCurrent: false },
    );

    // Get author from request (in real implementation, get from auth)
    const requestData = (createProjectStatusForProjectRequest.data || {}) as any;
    if (requestData.author) {
      const author = await this.userRepository.findOne({
        where: { gid: requestData.author },
      });
      if (author) {
        statusData.author = author;
        statusData.createdBy = author;
      }
    }

    const status = this.projectStatusRepository.create(statusData);
    const savedStatus = await this.projectStatusRepository.save(status);

    const statusWithRelations = await this.projectStatusRepository.findOne({
      where: { gid: savedStatus.gid },
      relations: ['project', 'author', 'createdBy'],
    });

    if (!statusWithRelations) {
      throw new NotFoundException(`Project status with gid ${savedStatus.gid} not found`);
    }

    return {
      data: ProjectStatusMapper.toResponse(statusWithRelations, optFields),
    };
  }

  async deleteProjectStatus(
    projectStatusGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const status = await this.projectStatusRepository.findOne({
      where: { gid: projectStatusGid },
    });

    if (!status) {
      throw new NotFoundException(`Project status with gid ${projectStatusGid} not found`);
    }

    await this.projectStatusRepository.remove(status);
    return { data: {} };
  }

  async getProjectStatus(
    projectStatusGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectStatus200Response> {
    const status = await this.projectStatusRepository.findOne({
      where: { gid: projectStatusGid },
      relations: ['project', 'author', 'createdBy'],
    });

    if (!status) {
      throw new NotFoundException(`Project status with gid ${projectStatusGid} not found`);
    }

    return {
      data: ProjectStatusMapper.toResponse(status, optFields),
    };
  }

  async getProjectStatusesForProject(
    projectGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectStatusesForProject200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const query = this.projectStatusRepository.createQueryBuilder('status')
      .where('status.project.id = :projectId', { projectId: project.id })
      .leftJoinAndSelect('status.author', 'author')
      .leftJoinAndSelect('status.createdBy', 'createdBy')
      .orderBy('status.createdAt', 'DESC');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [statuses, total] = await query.getManyAndCount();

    return {
      data: statuses.map(s => ({
        gid: s.gid,
        resource_type: 'project_status',
        title: s.title,
        text: s.text,
        html_text: s.htmlText,
        color: s.color as any,
        created_at: s.createdAt.toISOString(),
        author: s.author ? {
          gid: s.author.gid,
          name: s.author.name,
        } : undefined,
        created_by: s.createdBy ? {
          gid: s.createdBy.gid,
          name: s.createdBy.name,
        } : undefined,
      } as ProjectStatusCompact)),
      next_page: offsetNum + statuses.length < total
        ? { offset: String(offsetNum + statuses.length) }
        : null,
    };
  }
}
