import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Workspace } from '../entities/workspace.entity';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByGid(gid: string, relations: string[] = []): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { gid },
      relations,
    });
    if (!project) {
      throw new NotFoundException(`Project with gid ${gid} not found`);
    }
    return project;
  }

  async create(data: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create({
      ...data,
      gid: generateGid('proj'),
    });
    return await this.projectRepository.save(project);
  }

  async update(gid: string, data: Partial<Project>): Promise<Project> {
    const project = await this.findOneByGid(gid);
    Object.assign(project, data);
    return await this.projectRepository.save(project);
  }

  async delete(gid: string): Promise<void> {
    const project = await this.findOneByGid(gid);
    await this.projectRepository.remove(project);
  }

  async findAll(filters: {
    workspace?: string;
    team?: string;
    archived?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<[Project[], number]> {
    const query = this.projectRepository.createQueryBuilder('project');

    if (filters.workspace) {
      query.andWhere('project.workspace.gid = :workspace', {
        workspace: filters.workspace,
      });
      query.leftJoinAndSelect('project.workspace', 'workspace');
    }

    if (filters.team) {
      query.andWhere('project.team.gid = :team', { team: filters.team });
      query.leftJoinAndSelect('project.team', 'team');
    }

    if (filters.archived !== undefined) {
      query.andWhere('project.archived = :archived', {
        archived: filters.archived,
      });
    }

    query
      .leftJoinAndSelect('project.members', 'members')
      .leftJoinAndSelect('project.followers', 'followers')
      .leftJoinAndSelect('project.owner', 'owner')
      .leftJoinAndSelect('project.completedBy', 'completedBy');

    if (filters.limit) {
      query.take(filters.limit);
    }
    if (filters.offset) {
      query.skip(filters.offset);
    }

    return await query.getManyAndCount();
  }
}

