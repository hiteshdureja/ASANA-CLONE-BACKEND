import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Observable } from 'rxjs';
import { ProjectsApi } from '../generated/api';
import {
  AddCustomFieldSettingForGoal200Response,
  AddCustomFieldSettingForGoalRequest,
  AddFollowersForProjectRequest,
  AddMembersForPortfolioRequest,
  ApproveAccessRequest200Response,
  CreateProject201Response,
  CreateProjectRequest,
  DuplicateProjectRequest,
  GetItemsForPortfolio200Response,
  GetJob200Response,
  GetTaskCountsForProject200Response,
  ProjectSaveAsTemplateRequest,
  RemoveCustomFieldSettingForGoalRequest,
  RemoveFollowersForProjectRequest,
  RemoveMembersForPortfolioRequest,
  UpdateProjectRequest,
  ProjectCompact,
  NextPage,
} from '../generated/models';
import { Project } from '../entities/project.entity';
import { Workspace } from '../entities/workspace.entity';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';
import { ProjectMapper } from '../mappers/project.mapper';
import { generateGid } from '../utils/gid.util';
import { generateNextPage } from '../utils/pagination.util';

@Injectable()
export class ProjectsApiImpl extends ProjectsApi {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super();
  }

  async addCustomFieldSettingForProject(
    projectGid: string,
    addCustomFieldSettingForGoalRequest: AddCustomFieldSettingForGoalRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<AddCustomFieldSettingForGoal200Response> {
    // Custom field settings implementation - placeholder for now
    throw new Error('Custom field settings not yet implemented');
  }

  async addFollowersForProject(
    projectGid: string,
    addFollowersForProjectRequest: AddFollowersForProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['followers', 'members', 'workspace', 'team', 'owner', 'completedBy'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const followerGids = (addFollowersForProjectRequest?.data as any)?.followers || [];

    if (!Array.isArray(followerGids) || followerGids.length === 0) {
      throw new BadRequestException('followers must be a non-empty array');
    }

    const followers = await this.userRepository.find({
      where: { gid: In(followerGids) },
    });

    // Validate all follower GIDs exist
    const foundGids = new Set(followers.map(f => f.gid));
    const missingGids = followerGids.filter(gid => !foundGids.has(gid));
    if (missingGids.length > 0) {
      throw new NotFoundException(`Users with gids ${missingGids.join(', ')} not found`);
    }

    // Add followers (they must be members first)
    for (const follower of followers) {
      if (!project.members.some(m => m.gid === follower.gid)) {
        project.members.push(follower);
      }
      if (!project.followers.some(f => f.gid === follower.gid)) {
        project.followers.push(follower);
      }
    }

    await this.projectRepository.save(project);

    const updatedProject = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['followers', 'members', 'workspace', 'team', 'owner', 'completedBy'],
    });

    if (!updatedProject) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(updatedProject, optFields),
    };
  }

  async addMembersForProject(
    projectGid: string,
    addMembersForPortfolioRequest: AddMembersForPortfolioRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['members', 'workspace', 'team', 'owner', 'completedBy', 'followers'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const memberGids = addMembersForPortfolioRequest?.data?.members?.split(',') || [];
    const members = await this.userRepository.find({
      where: { gid: In(memberGids) },
    });

    for (const member of members) {
      if (!project.members.some(m => m.gid === member.gid)) {
        project.members.push(member);
      }
    }

    await this.projectRepository.save(project);

    const updatedProject = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['members', 'workspace', 'team', 'owner', 'completedBy', 'followers'],
    });

    if (!updatedProject) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(updatedProject, optFields),
    };
  }

  async createProject(
    createProjectRequest: CreateProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const projectData = ProjectMapper.fromRequest(createProjectRequest.data || {});
    projectData.gid = generateGid("project")
    if (!projectData.name) {
      throw new BadRequestException('Project name is required');
    }

    // Handle workspace/team assignment
    if (createProjectRequest.data?.workspace) {
      const workspace = await this.workspaceRepository.findOne({
        where: { gid: createProjectRequest.data.workspace },
      });
      if (!workspace) {
        throw new NotFoundException(`Workspace with gid ${createProjectRequest.data.workspace} not found`);
      }
      projectData.workspace = workspace;
    }

    if (createProjectRequest.data?.team) {
      const team = await this.teamRepository.findOne({
        where: { gid: createProjectRequest.data.team },
      });
      if (!team) {
        throw new NotFoundException(`Team with gid ${createProjectRequest.data.team} not found`);
      }
      projectData.team = team;
    }

    // Handle owner
    if (createProjectRequest.data?.owner) {
      const owner = await this.userRepository.findOne({
        where: { gid: createProjectRequest.data.owner },
      });
      if (owner) {
        projectData.owner = owner;
      }
    }

    // Handle followers (comma-separated string)
    if (createProjectRequest.data?.followers) {
      const followerGids = createProjectRequest.data.followers.split(',');
      const followers = await this.userRepository.find({
        where: { gid: In(followerGids) },
      });
      projectData.followers = followers;
      projectData.members = followers; // Followers must be members
    }

    const project = this.projectRepository.create(projectData);
    const savedProject = await this.projectRepository.save(project);

    const projectWithRelations = await this.projectRepository.findOne({
      where: { gid: savedProject.gid },
      relations: ['workspace', 'team', 'owner', 'members', 'followers', 'completedBy'],
    });

    if (!projectWithRelations) {
      throw new NotFoundException(`Project with gid ${savedProject.gid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(projectWithRelations, optFields),
    };
  }

  async createProjectForTeam(
    teamGid: string,
    createProjectRequest: CreateProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
      relations: ['workspace'],
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const projectData = ProjectMapper.fromRequest(createProjectRequest.data || {});
    projectData.team = team;
    projectData.workspace = team.workspace;

    const project = this.projectRepository.create(projectData);
    const savedProject = await this.projectRepository.save(project);

    const projectWithRelations = await this.projectRepository.findOne({
      where: { gid: savedProject.gid },
      relations: ['workspace', 'team', 'owner', 'members', 'followers', 'completedBy'],
    });

    if (!projectWithRelations) {
      throw new NotFoundException(`Project with gid ${savedProject.gid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(projectWithRelations, optFields),
    };
  }

  async createProjectForWorkspace(
    workspaceGid: string,
    createProjectRequest: CreateProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const projectData = ProjectMapper.fromRequest(createProjectRequest.data || {});
    projectData.workspace = workspace;

    const project = this.projectRepository.create(projectData);
    const savedProject = await this.projectRepository.save(project);

    const projectWithRelations = await this.projectRepository.findOne({
      where: { gid: savedProject.gid },
      relations: ['workspace', 'team', 'owner', 'members', 'followers', 'completedBy'],
    });

    if (!projectWithRelations) {
      throw new NotFoundException(`Project with gid ${savedProject.gid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(projectWithRelations, optFields),
    };
  }

  async deleteProject(
    projectGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    await this.projectRepository.remove(project);

    return { data: {} };
  }

  async duplicateProject(
    projectGid: string,
    optPretty: boolean,
    optFields: any[],
    duplicateProjectRequest: DuplicateProjectRequest,
    request: Request,
  ): Promise<GetJob200Response> {
    // Duplication is typically an async job - return job response
    // For now, return a placeholder job
    return {
      data: {
        gid: generateGid('job'),
        resource_type: 'job',
        status: 'pending',
        new_project: {
          gid: generateGid('proj'),
          name: 'Duplicated Project',
        },
      },
    } as any;
  }

  async getProject(
    projectGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    console.log(`DEBUG: call getProject with gid=${projectGid}`);
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['workspace', 'team', 'owner', 'members', 'followers', 'completedBy', 'statuses'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(project, optFields),
    };
  }

  async getProjects(
    optPretty: boolean,
    limit: number,
    offset: string,
    workspace: string,
    team: string,
    archived: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetItemsForPortfolio200Response> {
    const query = this.projectRepository.createQueryBuilder('project');

    if (workspace) {
      query.andWhere('workspace.gid = :workspace', { workspace });
      query.leftJoinAndSelect('project.workspace', 'workspace');
    }

    if (team) {
      query.andWhere('team.gid = :team', { team });
      query.leftJoinAndSelect('project.team', 'team');
    }

    if (archived !== undefined) {
      query.andWhere('project.archived = :archived', { archived });
    }

    query
      .leftJoinAndSelect('project.members', 'members')
      .leftJoinAndSelect('project.followers', 'followers')
      .leftJoinAndSelect('project.owner', 'owner');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [projects, total] = await query.getManyAndCount();

    const limitNum = limit || 100;
    const nextPage = generateNextPage(
      request as any,
      offsetNum,
      limitNum,
      total,
      offsetNum + projects.length < total,
    );

    // For list endpoints, return ProjectCompact (minimal fields by default)
    // If optFields is specified, return expanded fields but still as ProjectCompact structure
    const projectData: ProjectCompact[] = projects.map(p => {
      if (optFields && optFields.length > 0) {
        // If optFields specified, return expanded project with requested fields
        const fullProject = ProjectMapper.toResponse(p, optFields);
        return {
          gid: fullProject.gid,
          resource_type: fullProject.resource_type,
          name: fullProject.name,
          ...fullProject, // Include all requested fields
        } as any;
      }
      // Default: return compact format
      return {
        gid: p.gid,
        resource_type: 'project',
        name: p.name,
      };
    });

    return {
      data: projectData,
      next_page: nextPage,
    };
  }

  async getProjectsForTask(
    taskGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetItemsForPortfolio200Response> {
    const task = await this.taskRepository.findOne({
      where: { gid: taskGid },
    });

    if (!task) {
      throw new NotFoundException(`Task with gid ${taskGid} not found`);
    }

    const query = this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project.tasks', 'task', 'task.gid = :taskGid', { taskGid })
      .leftJoinAndSelect('project.workspace', 'workspace')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('project.owner', 'owner')
      .leftJoinAndSelect('project.members', 'members')
      .leftJoinAndSelect('project.followers', 'followers');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const limitNum = limit || 100;
    query.skip(offsetNum).take(limitNum);

    const [projects, total] = await query.getManyAndCount();

    const nextPage = generateNextPage(
      request as any,
      offsetNum,
      limitNum,
      total,
      offsetNum + projects.length < total,
    );

    // For list endpoints, return ProjectCompact
    const projectData: ProjectCompact[] = projects.map(p => {
      if (optFields && optFields.length > 0) {
        const fullProject = ProjectMapper.toResponse(p, optFields);
        return {
          gid: fullProject.gid,
          resource_type: fullProject.resource_type,
          name: fullProject.name,
          ...fullProject,
        } as any;
      }
      return {
        gid: p.gid,
        resource_type: 'project',
        name: p.name,
      };
    });

    return {
      data: projectData,
      next_page: nextPage,
    };
  }

  async getProjectsForTeam(
    teamGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    archived: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetItemsForPortfolio200Response> {
    const team = await this.teamRepository.findOne({
      where: { gid: teamGid },
    });

    if (!team) {
      throw new NotFoundException(`Team with gid ${teamGid} not found`);
    }

    const query = this.projectRepository.createQueryBuilder('project')
      .where('project.team.id = :teamId', { teamId: team.id });

    if (archived !== undefined) {
      query.andWhere('project.archived = :archived', { archived });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [projects, total] = await query.getManyAndCount();

    return {
      data: projects.map(p => ({
        gid: p.gid,
        resource_type: 'project',
        name: p.name,
      } as ProjectCompact)),
      next_page: offsetNum + projects.length < total
        ? { offset: String(offsetNum + projects.length) }
        : null,
    };
  }

  async getProjectsForWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    archived: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetItemsForPortfolio200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const query = this.projectRepository.createQueryBuilder('project')
      .where('project.workspace.id = :workspaceId', { workspaceId: workspace.id });

    if (archived !== undefined) {
      query.andWhere('project.archived = :archived', { archived });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [projects, total] = await query.getManyAndCount();

    return {
      data: projects.map(p => ({
        gid: p.gid,
        resource_type: 'project',
        name: p.name,
      } as ProjectCompact)),
      next_page: offsetNum + projects.length < total
        ? { offset: String(offsetNum + projects.length) }
        : null,
    };
  }

  async getTaskCountsForProject(
    projectGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetTaskCountsForProject200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['tasks'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const tasks = project.tasks || [];
    const completedTasks = tasks.filter(t => t.completed);
    const incompleteTasks = tasks.filter(t => !t.completed);

    return {
      data: {
        num_tasks: tasks.length,
        num_completed_tasks: completedTasks.length,
        num_incomplete_tasks: incompleteTasks.length,
        num_milestones: tasks.filter(t => t.resourceSubtype === 'milestone').length,
        num_completed_milestones: tasks.filter(t => t.resourceSubtype === 'milestone' && t.completed).length,
        num_incomplete_milestones: tasks.filter(t => t.resourceSubtype === 'milestone' && !t.completed).length,
      },
    };
  }

  async projectSaveAsTemplate(
    projectGid: string,
    projectSaveAsTemplateRequest: ProjectSaveAsTemplateRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetJob200Response> {
    // Save as template is typically an async job
    return {
      data: {
        gid: generateGid('job'),
        resource_type: 'job',
        status: 'pending',
        new_project_template: {
          gid: generateGid('proj_template'),
          name: 'Template from Project',
        },
      },
    } as any;
  }

  async removeCustomFieldSettingForProject(
    projectGid: string,
    removeCustomFieldSettingForGoalRequest: RemoveCustomFieldSettingForGoalRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    // Custom field settings implementation - placeholder
    throw new Error('Custom field settings not yet implemented');
  }

  async removeFollowersForProject(
    projectGid: string,
    removeFollowersForProjectRequest: RemoveFollowersForProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['followers', 'members', 'workspace', 'team', 'owner', 'completedBy'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const followerGids = (removeFollowersForProjectRequest?.data as any)?.followers || [];
    project.followers = project.followers.filter(f => !followerGids.includes(f.gid));

    await this.projectRepository.save(project);

    const updatedProject = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['followers', 'members', 'workspace', 'team', 'owner', 'completedBy'],
    });

    if (!updatedProject) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(updatedProject, optFields),
    };
  }

  async removeMembersForProject(
    projectGid: string,
    removeMembersForPortfolioRequest: RemoveMembersForPortfolioRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['members', 'followers', 'workspace', 'team', 'owner', 'completedBy'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const memberGids = removeMembersForPortfolioRequest?.data?.members?.split(',') || [];
    project.members = project.members.filter(m => !memberGids.includes(m.gid));
    // Also remove from followers if they were following
    project.followers = project.followers.filter(f => !memberGids.includes(f.gid));

    await this.projectRepository.save(project);

    const updatedProject = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['members', 'followers', 'workspace', 'team', 'owner', 'completedBy'],
    });

    if (!updatedProject) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(updatedProject, optFields),
    };
  }

  async updateProject(
    projectGid: string,
    updateProjectRequest: UpdateProjectRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateProject201Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['workspace', 'team', 'owner', 'members', 'followers', 'completedBy'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const updateData = updateProjectRequest.data || {};

    if (updateData.name !== undefined) project.name = updateData.name;
    if (updateData.notes !== undefined) project.notes = updateData.notes;
    if (updateData.html_notes !== undefined) project.htmlNotes = updateData.html_notes;
    if (updateData.archived !== undefined) project.archived = updateData.archived;
    if (updateData.color !== undefined) project.color = updateData.color as any;
    if (updateData.default_view !== undefined) project.defaultView = updateData.default_view;
    if (updateData.due_on !== undefined) project.dueOn = updateData.due_on ? new Date(updateData.due_on) : (null as any);
    if (updateData.start_on !== undefined) project.startOn = updateData.start_on ? new Date(updateData.start_on) : (null as any);
    if (updateData.privacy_setting !== undefined) project.privacySetting = updateData.privacy_setting;
    if (updateData.public !== undefined) project.public = updateData.public;
    if (updateData.default_access_level !== undefined) project.defaultAccessLevel = updateData.default_access_level;

    // Handle completion (if present in request data)
    const requestData = updateProjectRequest.data as any;
    if (requestData?.completed !== undefined) {
      project.completed = requestData.completed;
      if (requestData.completed) {
        project.completedAt = new Date();
        // In a real implementation, you'd get the current user from the request
        // project.completedBy = currentUser;
      } else {
        project.completedAt = null as any;
        project.completedBy = null as any;
      }
    }

    await this.projectRepository.save(project);

    const updatedProject = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['workspace', 'team', 'owner', 'members', 'followers', 'completedBy'],
    });

    if (!updatedProject) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    return {
      data: ProjectMapper.toResponse(updatedProject, optFields),
    };
  }
}
