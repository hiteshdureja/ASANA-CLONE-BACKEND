import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { StoriesApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  GetStoriesForTask200Response,
  GetStory200Response,
  StoryCompact,
  UpdateStoryRequest,
} from '../generated/models';
import { Story } from '../entities/story.entity';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { StoryMapper } from '../mappers/story.mapper';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class StoriesApiImpl extends StoriesApi {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async createStoryForTask(
    taskGid: string,
    updateStoryRequest: UpdateStoryRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetStory200Response> {
    const task = await this.taskRepository.findOne({
      where: { gid: taskGid },
      relations: ['createdBy'],
    });

    if (!task) {
      throw new NotFoundException(`Task with gid ${taskGid} not found`);
    }

    const storyData = StoryMapper.fromRequest(updateStoryRequest.data || {});
    storyData.task = task;
    storyData.createdBy = task.createdBy;

    const story = this.storyRepository.create(storyData);
    const savedStory = await this.storyRepository.save(story);

    const storyWithRelations = await this.storyRepository.findOne({
      where: { gid: savedStory.gid },
      relations: ['task', 'createdBy', 'task.createdBy'],
    });

    if (!storyWithRelations) {
      throw new NotFoundException(`Story with gid ${savedStory.gid} not found`);
    }

    return {
      data: StoryMapper.toResponse(storyWithRelations, optFields),
    };
  }

  async deleteStory(
    storyGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const story = await this.storyRepository.findOne({
      where: { gid: storyGid },
    });

    if (!story) {
      throw new NotFoundException(`Story with gid ${storyGid} not found`);
    }

    await this.storyRepository.remove(story);
    return { data: {} };
  }

  async getStoriesForTask(
    taskGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetStoriesForTask200Response> {
    const task = await this.taskRepository.findOne({
      where: { gid: taskGid },
    });

    if (!task) {
      throw new NotFoundException(`Task with gid ${taskGid} not found`);
    }

    const query = this.storyRepository.createQueryBuilder('story')
      .where('story.task.id = :taskId', { taskId: task.id })
      .leftJoinAndSelect('story.createdBy', 'createdBy')
      .orderBy('story.createdAt', 'DESC');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const stories = await query.getMany();

    return {
      data: stories.map(s => ({
        gid: s.gid,
        resource_type: 'story',
        text: s.text,
        html_text: s.htmlText,
        resource_subtype: s.resourceSubtype as any,
        created_by: s.createdBy ? {
          gid: s.createdBy.gid,
          name: s.createdBy.name,
        } : undefined,
      } as StoryCompact)),
    };
  }

  async getStory(
    storyGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetStory200Response> {
    const story = await this.storyRepository.findOne({
      where: { gid: storyGid },
      relations: ['task', 'createdBy', 'task.createdBy'],
    });

    if (!story) {
      throw new NotFoundException(`Story with gid ${storyGid} not found`);
    }

    return {
      data: StoryMapper.toResponse(story, optFields),
    };
  }

  async updateStory(
    storyGid: string,
    updateStoryRequest: UpdateStoryRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetStory200Response> {
    const story = await this.storyRepository.findOne({
      where: { gid: storyGid },
      relations: ['task', 'createdBy', 'task.createdBy'],
    });

    if (!story) {
      throw new NotFoundException(`Story with gid ${storyGid} not found`);
    }

    const updateData = updateStoryRequest.data || {};
    if (updateData.text !== undefined) story.text = updateData.text;
    if (updateData.html_text !== undefined) story.htmlText = updateData.html_text;
    if (updateData.is_pinned !== undefined) story.isPinned = updateData.is_pinned;

    await this.storyRepository.save(story);

    return {
      data: StoryMapper.toResponse(story, optFields),
    };
  }
}
