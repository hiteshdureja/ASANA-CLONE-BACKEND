import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Observable } from 'rxjs';
import { TypeaheadApi } from '../generated/api';
import {
  TypeaheadForWorkspace200Response,
} from '../generated/models';
import { Workspace } from '../entities/workspace.entity';
import { Project } from '../entities/project.entity';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';
import { CustomField } from '../entities/custom-field.entity';

@Injectable()
export class TypeaheadApiImpl extends TypeaheadApi {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(CustomField)
    private customFieldRepository: Repository<CustomField>,
  ) {
    super();
  }

  async typeaheadForWorkspace(
    workspaceGid: string,
    resourceType: 'custom_field' | 'goal' | 'project' | 'project_template' | 'portfolio' | 'tag' | 'task' | 'team' | 'user',
    type: 'custom_field' | 'portfolio' | 'project' | 'tag' | 'task' | 'user',
    query: string,
    count: number,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<TypeaheadForWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const searchQuery = query.toLowerCase();
    const limit = count || 20;
    const results: any[] = [];

    // Search based on type
    if (type === 'project' || resourceType === 'project') {
      const projects = await this.projectRepository.find({
        where: [
          { workspace: { id: workspace.id }, name: Like(`%${searchQuery}%`) },
        ],
        take: limit,
      });
      results.push(...projects.map(p => ({
        gid: p.gid,
        resource_type: 'project',
        name: p.name,
      })));
    }

    if (type === 'task' || resourceType === 'task') {
      const tasks = await this.taskRepository.find({
        where: [
          { workspace: { id: workspace.id }, name: Like(`%${searchQuery}%`) },
        ],
        take: limit,
      });
      results.push(...tasks.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
      })));
    }

    if (type === 'user' || resourceType === 'user') {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin('user.workspaces', 'workspace', 'workspace.id = :workspaceId', { workspaceId: workspace.id })
        .where('LOWER(user.name) LIKE :query', { query: `%${searchQuery}%` })
        .orWhere('LOWER(user.email) LIKE :query', { query: `%${searchQuery}%` })
        .take(limit)
        .getMany();
      results.push(...users.map(u => ({
        gid: u.gid,
        resource_type: 'user',
        name: u.name,
      })));
    }

    if (type === 'tag' || resourceType === 'tag') {
      const tags = await this.tagRepository.find({
        where: [
          { workspace: { id: workspace.id }, name: Like(`%${searchQuery}%`) },
        ],
        take: limit,
      });
      results.push(...tags.map(t => ({
        gid: t.gid,
        resource_type: 'tag',
        name: t.name,
      })));
    }

    if (type === 'custom_field' || resourceType === 'custom_field') {
      const customFields = await this.customFieldRepository.find({
        where: [
          { workspace: { id: workspace.id }, name: Like(`%${searchQuery}%`) },
        ],
        take: limit,
      });
      results.push(...customFields.map(cf => ({
        gid: cf.gid,
        resource_type: 'custom_field',
        name: cf.name,
      })));
    }

    // Limit results and sort by relevance (simple: by name match)
    const sortedResults = results
      .slice(0, limit)
      .sort((a, b) => {
        const aMatch = a.name.toLowerCase().indexOf(searchQuery);
        const bMatch = b.name.toLowerCase().indexOf(searchQuery);
        return aMatch - bMatch;
      });

    return {
      data: sortedResults,
    };
  }
}
