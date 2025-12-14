import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { UserTaskListsApi } from '../generated/api';
import {
  GetUserTaskList200Response,
} from '../generated/models';
import { UserTaskList } from '../entities/project-brief.entity';
import { User } from '../entities/user.entity';
import { Workspace } from '../entities/workspace.entity';

@Injectable()
export class UserTaskListsApiImpl extends UserTaskListsApi {
  constructor(
    @InjectRepository(UserTaskList)
    private userTaskListRepository: Repository<UserTaskList>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {
    super();
  }

  async getUserTaskList(
    userTaskListGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetUserTaskList200Response> {
    const userTaskList = await this.userTaskListRepository.findOne({
      where: { gid: userTaskListGid },
      relations: ['owner', 'workspace'],
    });

    if (!userTaskList) {
      throw new NotFoundException(`User task list with gid ${userTaskListGid} not found`);
    }

    return {
      data: {
        gid: userTaskList.gid,
        resource_type: 'user_task_list',
        name: userTaskList.name,
        owner: {
          gid: userTaskList.owner.gid,
          name: userTaskList.owner.name,
        },
        workspace: {
          gid: userTaskList.workspace.gid,
          name: userTaskList.workspace.name,
        },
      },
    };
  }

  async getUserTaskListForUser(
    userGid: string,
    workspace: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetUserTaskList200Response> {
    const user = await this.userRepository.findOne({
      where: { gid: userGid },
    });

    if (!user) {
      throw new NotFoundException(`User with gid ${userGid} not found`);
    }

    const workspaceEntity = await this.workspaceRepository.findOne({
      where: { gid: workspace },
    });

    if (!workspaceEntity) {
      throw new NotFoundException(`Workspace with gid ${workspace} not found`);
    }

    let userTaskList = await this.userTaskListRepository.findOne({
      where: {
        owner: { id: user.id },
        workspace: { id: workspaceEntity.id },
      },
      relations: ['owner', 'workspace'],
    });

    // Create if doesn't exist (default "My Tasks" list)
    if (!userTaskList) {
      userTaskList = this.userTaskListRepository.create({
        gid: `user_task_list_${user.gid}_${workspaceEntity.gid}`,
        name: 'My Tasks',
        owner: user,
        workspace: workspaceEntity,
      });
      userTaskList = await this.userTaskListRepository.save(userTaskList);
    }

    return {
      data: {
        gid: userTaskList.gid,
        resource_type: 'user_task_list',
        name: userTaskList.name,
        owner: {
          gid: userTaskList.owner.gid,
          name: userTaskList.owner.name,
        },
        workspace: {
          gid: userTaskList.workspace.gid,
          name: userTaskList.workspace.name,
        },
      },
    };
  }
}
