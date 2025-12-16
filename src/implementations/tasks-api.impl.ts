import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like as TypeOrmLike } from 'typeorm';
import { Observable } from 'rxjs';
import { TasksApi } from '../generated/api';
import {
  AddDependenciesForTaskRequest,
  AddDependentsForTaskRequest,
  AddFollowersRequest,
  AddProjectForTaskRequest,
  AddTagForTaskRequest,
  ApproveAccessRequest200Response,
  CreateTask201Response,
  CreateTaskRequest,
  DuplicateTaskRequest,
  GetJob200Response,
  GetTasks200Response,
  RemoveFollowerForTaskRequest,
  RemoveProjectForTaskRequest,
  RemoveTagForTaskRequest,
  SearchTasksForWorkspace200Response,
  SetParentForTaskRequest,
  TaskCompact,
  NextPage,
} from '../generated/models';
import { Task } from '../entities/task.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { Workspace } from '../entities/workspace.entity';
import { Tag } from '../entities/tag.entity';
import { Section } from '../entities/section.entity';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskService } from '../services/task.service';
import { generateGid } from '../utils/gid.util';
import { generateNextPage } from '../utils/pagination.util';

@Injectable()
export class TasksApiImpl extends TasksApi {
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
    private taskService: TaskService,
  ) {
    super();
  }

  async addDependenciesForTask(
    taskGid: string,
    addDependenciesForTaskRequest: AddDependenciesForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['dependencies']);
    const dependencyGids = addDependenciesForTaskRequest?.data?.dependencies || [];
    const dependencies = await this.taskRepository.find({
      where: { gid: In(dependencyGids) },
    });

    for (const dep of dependencies) {
      if (!task.dependencies.some(d => d.gid === dep.gid)) {
        task.dependencies.push(dep);
      }
    }

    await this.taskRepository.save(task);
    return { data: {} };
  }

  async addDependentsForTask(
    taskGid: string,
    addDependentsForTaskRequest: AddDependentsForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['dependents']);
    const dependentGids = addDependentsForTaskRequest?.data?.dependents || [];
    const dependents = await this.taskRepository.find({
      where: { gid: In(dependentGids) },
    });

    for (const dep of dependents) {
      if (!task.dependents.some(d => d.gid === dep.gid)) {
        task.dependents.push(dep);
      }
    }

    await this.taskRepository.save(task);
    return { data: {} };
  }

  async addFollowersForTask(
    taskGid: string,
    addFollowersRequest: AddFollowersRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['followers']);
    const followerGids = addFollowersRequest?.data?.followers || [];
    const followers = await this.userRepository.find({
      where: { gid: In(followerGids) },
    });

    for (const follower of followers) {
      if (!task.followers.some(f => f.gid === follower.gid)) {
        task.followers.push(follower);
      }
    }

    await this.taskRepository.save(task);

    const updatedTask = await this.taskService.findOneByGid(taskGid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers', 'dependencies', 'dependents', 'subtasks',
    ]);

    return {
      data: TaskMapper.toResponse(updatedTask, optFields),
    };
  }

  async addProjectForTask(
    taskGid: string,
    addProjectForTaskRequest: AddProjectForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['projects']);
    const projectGid = addProjectForTaskRequest?.data?.project;
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    if (!task.projects.some(p => p.gid === project.gid)) {
      task.projects.push(project);
      await this.taskRepository.save(task);
    }

    return { data: {} };
  }

  async addTagForTask(
    taskGid: string,
    addTagForTaskRequest: AddTagForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['tags']);
    const tagGid = addTagForTaskRequest?.data?.tag;
    const tag = await this.tagRepository.findOne({
      where: { gid: tagGid },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with gid ${tagGid} not found`);
    }

    if (!task.tags.some(t => t.gid === tag.gid)) {
      task.tags.push(tag);
      await this.taskRepository.save(task);
    }

    return { data: {} };
  }

  async createSubtaskForTask(
    taskGid: string,
    createTaskRequest: CreateTaskRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const parentTask = await this.taskService.findOneByGid(taskGid);
    const taskData = TaskMapper.fromRequest(createTaskRequest.data || {});

    if (!taskData.name) {
      throw new BadRequestException('Task name is required');
    }
    taskData.gid = generateGid('task');

    taskData.parent = parentTask;
    taskData.workspace = parentTask.workspace;
    taskData.createdBy = parentTask.createdBy;

    const task = this.taskRepository.create(taskData);
    const savedTask = await this.taskRepository.save(task);

    const taskWithRelations = await this.taskService.findOneByGid(savedTask.gid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers',
    ]);

    return {
      data: TaskMapper.toResponse(taskWithRelations, optFields),
    };
  }

  async createTask(
    createTaskRequest: CreateTaskRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const taskData = TaskMapper.fromRequest(createTaskRequest.data || {});

    if (!taskData.name) {
      throw new BadRequestException('Task name is required');
    }
    taskData.gid = generateGid('task')

    // Handle workspace
    if (createTaskRequest.data?.workspace) {
      const workspace = await this.workspaceRepository.findOne({
        where: { gid: createTaskRequest.data.workspace },
      });
      if (!workspace) {
        throw new NotFoundException(`Workspace with gid ${createTaskRequest.data.workspace} not found`);
      }
      taskData.workspace = workspace;
    }

    // Handle assignee
    if (createTaskRequest.data?.assignee) {
      const assignee = await this.userRepository.findOne({
        where: { gid: createTaskRequest.data.assignee },
      });
      if (assignee) {
        taskData.assignee = assignee;
      }
    }

    // Handle createdBy (default to assignee if not provided)
    if (!taskData.createdBy && taskData.assignee) {
      taskData.createdBy = taskData.assignee;
    } else if (createTaskRequest.data?.created_by) {
      const createdByGid = typeof createTaskRequest.data.created_by === 'string'
        ? createTaskRequest.data.created_by
        : createTaskRequest.data.created_by?.gid;
      if (createdByGid) {
        const createdBy = await this.userRepository.findOne({
          where: { gid: createdByGid },
        });
        if (createdBy) {
          taskData.createdBy = createdBy;
        }
      }
    }

    // Handle projects
    if (createTaskRequest.data?.projects) {
      const projectGids = Array.isArray(createTaskRequest.data.projects)
        ? createTaskRequest.data.projects
        : [createTaskRequest.data.projects];
      const projects = await this.projectRepository.find({
        where: { gid: In(projectGids) },
      });
      taskData.projects = projects;
    }

    // Handle tags
    if (createTaskRequest.data?.tags) {
      const tagGids = Array.isArray(createTaskRequest.data.tags)
        ? createTaskRequest.data.tags
        : [createTaskRequest.data.tags];
      const tags = await this.tagRepository.find({
        where: { gid: In(tagGids) },
      });
      taskData.tags = tags;
    }

    // Handle followers
    if (createTaskRequest.data?.followers) {
      const followerGids = Array.isArray(createTaskRequest.data.followers)
        ? createTaskRequest.data.followers
        : [createTaskRequest.data.followers];
      const followers = await this.userRepository.find({
        where: { gid: In(followerGids) },
      });
      taskData.followers = followers;
    }
    console.log("taskData>>>", taskData)
    const task = this.taskRepository.create(taskData);
    const savedTask = await this.taskRepository.save(task);

    const taskWithRelations = await this.taskService.findOneByGid(savedTask.gid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers', 'sections',
    ]);

    return {
      data: TaskMapper.toResponse(taskWithRelations, optFields),
    };
  }

  async deleteTask(
    taskGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    await this.taskService.delete(taskGid);
    return { data: {} };
  }

  async duplicateTask(
    taskGid: string,
    duplicateTaskRequest: DuplicateTaskRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetJob200Response> {
    // Duplication is typically an async job
    return {
      data: {
        gid: generateGid('job'),
        resource_type: 'job',
        status: 'pending',
        new_task: {
          gid: generateGid('task'),
          name: 'Duplicated Task',
        },
      },
    } as any;
  }

  async getDependenciesForTask(
    taskGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['dependencies']);
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const dependencies = task.dependencies.slice(offsetNum, offsetNum + (limit || 100));

    return {
      data: dependencies.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
        resource_subtype: t.resourceSubtype as any,
        created_by: t.createdBy ? {
          gid: t.createdBy.gid,
          name: t.createdBy.name,
        } : undefined,
      } as TaskCompact)),
      next_page: offsetNum + dependencies.length < task.dependencies.length
        ? { offset: String(offsetNum + dependencies.length) }
        : null,
    };
  }

  async getDependentsForTask(
    taskGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['dependents']);
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const dependents = task.dependents.slice(offsetNum, offsetNum + (limit || 100));

    return {
      data: dependents.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
        resource_subtype: t.resourceSubtype as any,
        created_by: t.createdBy ? {
          gid: t.createdBy.gid,
          name: t.createdBy.name,
        } : undefined,
      } as TaskCompact)),
      next_page: offsetNum + dependents.length < task.dependents.length
        ? { offset: String(offsetNum + dependents.length) }
        : null,
    };
  }

  async getSubtasksForTask(
    taskGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['subtasks', 'subtasks.createdBy']);
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const subtasks = task.subtasks.slice(offsetNum, offsetNum + (limit || 100));

    return {
      data: subtasks.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
        resource_subtype: t.resourceSubtype as any,
        created_by: t.createdBy ? {
          gid: t.createdBy.gid,
          name: t.createdBy.name,
        } : undefined,
      } as TaskCompact)),
      next_page: offsetNum + subtasks.length < task.subtasks.length
        ? { offset: String(offsetNum + subtasks.length) }
        : null,
    };
  }

  async getTask(
    taskGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const task = await this.taskService.findOneByGid(taskGid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers', 'dependencies', 'dependents', 'subtasks', 'sections',
    ]);

    return {
      data: TaskMapper.toResponse(task, optFields),
    };
  }

  async getTaskForCustomID(
    workspaceGid: string,
    customId: string,
    request: Request,
  ): Promise<CreateTask201Response> {
    const task = await this.taskService.findByCustomId(workspaceGid, customId);

    return {
      data: TaskMapper.toResponse(task, undefined),
    };
  }

  async getTasks(
    optPretty: boolean,
    limit: number,
    offset: string,
    assignee: string,
    project: string,
    section: string,
    workspace: string,
    completedSince: string,
    modifiedSince: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    if (!assignee && !project && !section && !workspace && !completedSince && !modifiedSince && !(request as any).query['user_task_list']) {
      throw new BadRequestException('At least one filter (workspace, project, section, assignee, user_task_list, etc.) is required.');
    }

    // Asana STRICT requires assignee if workspace is provided as the ONLY other filter (roughly)
    // Actually Asana says: "You must specify one of 'project', 'tag', 'section', 'user_task_list', or 'assignee' + 'workspace'."
    // So if I have workspace, I MUST have one of the others.
    if (workspace && !assignee && !project && !section && !(request as any).query['tag'] && !(request as any).query['user_task_list']) {
      throw new BadRequestException('If workspace is provided, you must also specify assignee, project, tag, section, or user_task_list.');
    }

    const [tasks, total] = await this.taskService.findAll({
      assignee,
      project,
      section,
      workspace,
      completedSince,
      modifiedSince,
      limit: limit || 100,
      offset: offset ? parseInt(offset, 10) : 0,
    });

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const limitNum = limit || 100;

    const nextPage = generateNextPage(
      request as any,
      offsetNum,
      limitNum,
      total,
      offsetNum + tasks.length < total,
    );

    return {
      data: tasks.map(t => TaskMapper.toResponse(t, optFields)),
      next_page: nextPage,
    };
  }

  async getTasksForProject(
    projectGid: string,
    completedSince: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const query = this.taskRepository
      .createQueryBuilder('task')
      .innerJoin('task.projects', 'project', 'project.gid = :projectGid', { projectGid })
      .leftJoinAndSelect('task.createdBy', 'createdBy')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.completedBy', 'completedBy')
      .leftJoinAndSelect('task.workspace', 'workspace')
      .leftJoinAndSelect('task.projects', 'projects')
      .leftJoinAndSelect('task.tags', 'tags')
      .leftJoinAndSelect('task.followers', 'followers');

    if (completedSince) {
      query.andWhere('task.completedAt >= :completedSince', {
        completedSince: new Date(completedSince),
      });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const limitNum = limit || 100;
    query.skip(offsetNum).take(limitNum);

    const [tasks, total] = await query.getManyAndCount();

    const nextPage = generateNextPage(
      request as any,
      offsetNum,
      limitNum,
      total,
      offsetNum + tasks.length < total,
    );

    return {
      data: tasks.map(t => TaskMapper.toResponse(t, optFields)),
      next_page: nextPage,
    };
  }

  async getTasksForSection(
    sectionGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    completedSince: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    const section = await this.sectionRepository.findOne({
      where: { gid: sectionGid },
      relations: ['tasks', 'tasks.createdBy'],
    });

    if (!section) {
      throw new NotFoundException(`Section with gid ${sectionGid} not found`);
    }

    let tasks = section.tasks || [];
    if (completedSince) {
      const sinceDate = new Date(completedSince);
      tasks = tasks.filter(t => t.completedAt && t.completedAt >= sinceDate);
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const paginatedTasks = tasks.slice(offsetNum, offsetNum + (limit || 100));

    return {
      data: paginatedTasks.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
        resource_subtype: t.resourceSubtype as any,
        created_by: t.createdBy ? {
          gid: t.createdBy.gid,
          name: t.createdBy.name,
        } : undefined,
      } as TaskCompact)),
      next_page: offsetNum + paginatedTasks.length < tasks.length
        ? { offset: String(offsetNum + paginatedTasks.length) }
        : null,
    };
  }

  async getTasksForTag(
    tagGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    const tag = await this.tagRepository.findOne({
      where: { gid: tagGid },
      relations: ['tasks', 'tasks.createdBy'],
    });

    if (!tag) {
      throw new NotFoundException(`Tag with gid ${tagGid} not found`);
    }

    const tasks = tag.tasks || [];
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const paginatedTasks = tasks.slice(offsetNum, offsetNum + (limit || 100));

    return {
      data: paginatedTasks.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
        resource_subtype: t.resourceSubtype as any,
        created_by: t.createdBy ? {
          gid: t.createdBy.gid,
          name: t.createdBy.name,
        } : undefined,
      } as TaskCompact)),
      next_page: offsetNum + paginatedTasks.length < tasks.length
        ? { offset: String(offsetNum + paginatedTasks.length) }
        : null,
    };
  }

  async getTasksForUserTaskList(
    userTaskListGid: string,
    completedSince: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTasks200Response> {
    // User task lists are typically associated with a user's "My Tasks"
    // For now, return empty or implement based on user assignment
    return {
      data: [],
      next_page: null,
    };
  }

  async removeDependenciesForTask(
    taskGid: string,
    addDependenciesForTaskRequest: AddDependenciesForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['dependencies']);
    const dependencyGids = addDependenciesForTaskRequest?.data?.dependencies || [];
    task.dependencies = task.dependencies.filter(d => !dependencyGids.includes(d.gid));
    await this.taskRepository.save(task);
    return { data: {} };
  }

  async removeDependentsForTask(
    taskGid: string,
    addDependentsForTaskRequest: AddDependentsForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['dependents']);
    const dependentGids = addDependentsForTaskRequest?.data?.dependents || [];
    task.dependents = task.dependents.filter(d => !dependentGids.includes(d.gid));
    await this.taskRepository.save(task);
    return { data: {} };
  }

  async removeFollowerForTask(
    taskGid: string,
    removeFollowerForTaskRequest: RemoveFollowerForTaskRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['followers']);
    const followerGids = removeFollowerForTaskRequest?.data?.followers || [];
    task.followers = task.followers.filter(f => !followerGids.includes(f.gid));
    await this.taskRepository.save(task);

    const updatedTask = await this.taskService.findOneByGid(taskGid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers',
    ]);

    return {
      data: TaskMapper.toResponse(updatedTask, optFields),
    };
  }

  async removeProjectForTask(
    taskGid: string,
    removeProjectForTaskRequest: RemoveProjectForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['projects']);
    const projectGid = removeProjectForTaskRequest?.data?.project;
    task.projects = task.projects.filter(p => p.gid !== projectGid);
    await this.taskRepository.save(task);
    return { data: {} };
  }

  async removeTagForTask(
    taskGid: string,
    removeTagForTaskRequest: RemoveTagForTaskRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const task = await this.taskService.findOneByGid(taskGid, ['tags']);
    const tagGid = removeTagForTaskRequest?.data?.tag;
    task.tags = task.tags.filter(t => t.gid !== tagGid);
    await this.taskRepository.save(task);
    return { data: {} };
  }

  async searchTasksForWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    text: string,
    resourceSubtype: 'default_task' | 'milestone' | 'approval',
    assigneeAny: string,
    assigneeNot: string,
    portfoliosAny: string,
    projectsAny: string,
    projectsNot: string,
    projectsAll: string,
    sectionsAny: string,
    sectionsNot: string,
    sectionsAll: string,
    tagsAny: string,
    tagsNot: string,
    tagsAll: string,
    teamsAny: string,
    followersAny: string,
    followersNot: string,
    createdByAny: string,
    createdByNot: string,
    assignedByAny: string,
    assignedByNot: string,
    likedByNot: string,
    commentedOnByNot: string,
    dueOnBefore: string,
    dueOnAfter: string,
    dueOn: string,
    dueAtBefore: string,
    dueAtAfter: string,
    startOnBefore: string,
    startOnAfter: string,
    startOn: string,
    createdOnBefore: string,
    createdOnAfter: string,
    createdOn: string,
    createdAtBefore: string,
    createdAtAfter: string,
    completedOnBefore: string,
    completedOnAfter: string,
    completedOn: string,
    completedAtBefore: string,
    completedAtAfter: string,
    modifiedOnBefore: string,
    modifiedOnAfter: string,
    modifiedOn: string,
    modifiedAtBefore: string,
    modifiedAtAfter: string,
    isBlocking: boolean,
    isBlocked: boolean,
    hasAttachment: boolean,
    completed: boolean,
    isSubtask: boolean,
    sortBy: 'due_date' | 'created_at' | 'completed_at' | 'likes' | 'modified_at',
    sortAscending: boolean,
    optFields: any[],
    request: Request,
  ): Promise<SearchTasksForWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const query = this.taskRepository.createQueryBuilder('task')
      .where('task.workspace.id = :workspaceId', { workspaceId: workspace.id });

    if (text) {
      query.andWhere('task.name LIKE :text', { text: `%${text}%` });
    }

    if (resourceSubtype) {
      query.andWhere('task.resourceSubtype = :resourceSubtype', { resourceSubtype });
    }

    if (assigneeAny) {
      query.andWhere('task.assignee.gid = :assigneeAny', { assigneeAny });
      query.leftJoinAndSelect('task.assignee', 'assignee');
    }

    if (assigneeNot) {
      query.andWhere('task.assignee.gid != :assigneeNot OR task.assignee IS NULL', { assigneeNot });
    }

    if (projectsAny) {
      query.innerJoin('task.projects', 'project', 'project.gid = :projectsAny', { projectsAny });
      query.leftJoinAndSelect('task.projects', 'projects');
    }

    if (completed !== undefined) {
      query.andWhere('task.completed = :completed', { completed });
    }

    if (isSubtask !== undefined) {
      if (isSubtask) {
        query.andWhere('task.parent IS NOT NULL');
      } else {
        query.andWhere('task.parent IS NULL');
      }
    }

    if (dueOn) {
      query.andWhere('task.dueOn = :dueOn', { dueOn: new Date(dueOn) });
    }

    if (dueOnBefore) {
      query.andWhere('task.dueOn < :dueOnBefore', { dueOnBefore: new Date(dueOnBefore) });
    }

    if (dueOnAfter) {
      query.andWhere('task.dueOn > :dueOnAfter', { dueOnAfter: new Date(dueOnAfter) });
    }

    // Add sorting
    if (sortBy) {
      const order = sortAscending ? 'ASC' : 'DESC';
      switch (sortBy) {
        case 'due_date':
          query.orderBy('task.dueOn', order);
          break;
        case 'created_at':
          query.orderBy('task.createdAt', order);
          break;
        case 'completed_at':
          query.orderBy('task.completedAt', order);
          break;
        case 'modified_at':
          query.orderBy('task.modifiedAt', order);
          break;
      }
    }

    query.leftJoinAndSelect('task.createdBy', 'createdBy');

    const tasks = await query.getMany();

    return {
      data: tasks.map(t => ({
        gid: t.gid,
        resource_type: 'task',
        name: t.name,
        resource_subtype: t.resourceSubtype as any,
        created_by: t.createdBy ? {
          gid: t.createdBy.gid,
          name: t.createdBy.name,
        } : undefined,
      } as TaskCompact)),
    };
  }

  async setParentForTask(
    taskGid: string,
    setParentForTaskRequest: SetParentForTaskRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const task = await this.taskService.findOneByGid(taskGid);
    const parentGid = setParentForTaskRequest?.data?.parent;
    const parent = await this.taskRepository.findOne({
      where: { gid: parentGid },
    });

    if (!parent) {
      throw new NotFoundException(`Parent task with gid ${parentGid} not found`);
    }

    task.parent = parent;
    await this.taskRepository.save(task);

    const updatedTask = await this.taskService.findOneByGid(taskGid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers',
    ]);

    return {
      data: TaskMapper.toResponse(updatedTask, optFields),
    };
  }

  async updateTask(
    taskGid: string,
    createTaskRequest: CreateTaskRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTask201Response> {
    const task = await this.taskService.findOneByGid(taskGid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers',
    ]);

    const updateData = createTaskRequest.data || {};

    if (updateData.name !== undefined) task.name = updateData.name;
    if (updateData.notes !== undefined) task.notes = updateData.notes;
    if (updateData.html_notes !== undefined) task.htmlNotes = updateData.html_notes;
    if (updateData.completed !== undefined) {
      task.completed = updateData.completed;
      if (updateData.completed) {
        task.completedAt = new Date();
      } else {
        task.completedAt = null as any;
        task.completedBy = null as any;
      }
    }
    if (updateData.due_on !== undefined) task.dueOn = updateData.due_on ? new Date(updateData.due_on) : (null as any);
    if (updateData.due_at !== undefined) task.dueAt = updateData.due_at ? new Date(updateData.due_at) : (null as any);
    if (updateData.start_on !== undefined) task.startOn = updateData.start_on ? new Date(updateData.start_on) : (null as any);
    if (updateData.start_at !== undefined) task.startAt = updateData.start_at ? new Date(updateData.start_at) : (null as any);
    if (updateData.resource_subtype !== undefined) task.resourceSubtype = updateData.resource_subtype;
    if (updateData.approval_status !== undefined) task.approvalStatus = updateData.approval_status;
    if (updateData.assignee_status !== undefined) task.assigneeStatus = updateData.assignee_status;
    if (updateData.actual_time_minutes !== undefined) task.actualTimeMinutes = updateData.actual_time_minutes || (null as any);

    // Handle assignee
    if (updateData.assignee !== undefined) {
      if (updateData.assignee) {
        const assignee = await this.userRepository.findOne({
          where: { gid: updateData.assignee },
        });
        task.assignee = assignee || (null as any);
      } else {
        task.assignee = null as any;
      }
    }

    await this.taskRepository.save(task);

    const updatedTask = await this.taskService.findOneByGid(taskGid, [
      'assignee', 'createdBy', 'completedBy', 'parent', 'workspace', 'projects', 'tags', 'followers', 'dependencies', 'dependents', 'subtasks',
    ]);

    return {
      data: TaskMapper.toResponse(updatedTask, optFields),
    };
  }
}
