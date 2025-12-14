import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { Workspace } from '../entities/workspace.entity';
import { Tag } from '../entities/tag.entity';
import { Section } from '../entities/section.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async findOneByGid(gid: string, relations: string[] = []): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { gid },
      relations,
    });
    if (!task) {
      throw new NotFoundException(`Task with gid ${gid} not found`);
    }
    return task;
  }

  async findByCustomId(workspaceGid: string, customId: string): Promise<Task> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const task = await this.taskRepository.findOne({
      where: { customId, workspace: { id: workspace.id } },
      relations: ['assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers'],
    });
    if (!task) {
      throw new NotFoundException(`Task with custom_id ${customId} not found in workspace ${workspaceGid}`);
    }
    return task;
  }

  async create(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create({
      ...data,
      gid: generateGid('task'),
    });
    return await this.taskRepository.save(task);
  }

  async update(gid: string, data: Partial<Task>): Promise<Task> {
    const task = await this.findOneByGid(gid);
    Object.assign(task, data);
    return await this.taskRepository.save(task);
  }

  async delete(gid: string): Promise<void> {
    const task = await this.findOneByGid(gid);
    await this.taskRepository.remove(task);
  }

  async findAll(filters: {
    assignee?: string;
    project?: string;
    section?: string;
    workspace?: string;
    completedSince?: string;
    modifiedSince?: string;
    limit?: number;
    offset?: number;
  }): Promise<[Task[], number]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (filters.assignee) {
      query.andWhere('task.assignee.gid = :assignee', { assignee: filters.assignee });
      query.leftJoinAndSelect('task.assignee', 'assignee');
    }

    if (filters.project) {
      query.innerJoin('task.projects', 'project', 'project.gid = :projectGid', { projectGid: filters.project });
      query.leftJoinAndSelect('task.projects', 'projects');
    }

    if (filters.section) {
      query.innerJoin('task.sections', 'section', 'section.gid = :sectionGid', { sectionGid: filters.section });
      query.leftJoinAndSelect('task.sections', 'sections');
    }

    if (filters.workspace) {
      query.andWhere('task.workspace.gid = :workspace', { workspace: filters.workspace });
      query.leftJoinAndSelect('task.workspace', 'workspace');
    }

    if (filters.completedSince) {
      query.andWhere('task.completedAt >= :completedSince', { completedSince: new Date(filters.completedSince) });
    }

    if (filters.modifiedSince) {
      query.andWhere('task.modifiedAt >= :modifiedSince', { modifiedSince: new Date(filters.modifiedSince) });
    }

    query
      .leftJoinAndSelect('task.createdBy', 'createdBy')
      .leftJoinAndSelect('task.completedBy', 'completedBy')
      .leftJoinAndSelect('task.parent', 'parent')
      .leftJoinAndSelect('task.tags', 'tags')
      .leftJoinAndSelect('task.followers', 'followers');

    if (filters.limit) {
      query.take(filters.limit);
    }
    if (filters.offset) {
      query.skip(filters.offset);
    }

    return await query.getManyAndCount();
  }
}

