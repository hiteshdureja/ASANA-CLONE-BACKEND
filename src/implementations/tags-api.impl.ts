import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { TagsApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  CreateTag201Response,
  CreateTagRequest,
  GetTags200Response,
  TagCompact,
  NextPage,
  UpdateTagRequest,
} from '../generated/models';
import { Tag } from '../entities/tag.entity';
import { Workspace } from '../entities/workspace.entity';
import { TagMapper } from '../mappers/tag.mapper';
import { generateGid } from '../utils/gid.util';
import { generateNextPage } from '../utils/pagination.util';

@Injectable()
export class TagsApiImpl extends TagsApi {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {
    super();
  }

  async createTag(
    createTagRequest: CreateTagRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTag201Response> {
    const tagData = TagMapper.fromRequest(createTagRequest.data || {});

    if (!tagData.name) {
      throw new BadRequestException('Tag name is required');
    }

    if (createTagRequest.data?.workspace) {
      const workspace = await this.workspaceRepository.findOne({
        where: { gid: createTagRequest.data.workspace },
      });
      if (!workspace) {
        throw new NotFoundException(`Workspace with gid ${createTagRequest.data.workspace} not found`);
      }
      tagData.workspace = workspace;
    }

    const tag = this.tagRepository.create(tagData);
    const savedTag = await this.tagRepository.save(tag);

    const tagWithRelations = await this.tagRepository.findOne({
      where: { gid: savedTag.gid },
      relations: ['workspace'],
    });

    if (!tagWithRelations) {
      throw new NotFoundException(`Tag with gid ${savedTag.gid} not found`);
    }

    return {
      data: TagMapper.toResponse(tagWithRelations, optFields),
    };
  }

  async createTagForWorkspace(
    workspaceGid: string,
    createTagRequest: CreateTagRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTag201Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const tagData = TagMapper.fromRequest(createTagRequest.data || {});
    tagData.workspace = workspace;

    const tag = this.tagRepository.create(tagData);
    const savedTag = await this.tagRepository.save(tag);

    const tagWithRelations = await this.tagRepository.findOne({
      where: { gid: savedTag.gid },
      relations: ['workspace'],
    });

    if (!tagWithRelations) {
      throw new NotFoundException(`Tag with gid ${savedTag.gid} not found`);
    }

    return {
      data: TagMapper.toResponse(tagWithRelations, optFields),
    };
  }

  async deleteTag(
    tagGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const tag = await this.tagRepository.findOne({
      where: { gid: tagGid },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with gid ${tagGid} not found`);
    }

    await this.tagRepository.remove(tag);
    return { data: {} };
  }

  async getTag(
    tagGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTag201Response> {
    const tag = await this.tagRepository.findOne({
      where: { gid: tagGid },
      relations: ['workspace'],
    });

    if (!tag) {
      throw new NotFoundException(`Tag with gid ${tagGid} not found`);
    }

    return {
      data: TagMapper.toResponse(tag, optFields),
    };
  }

  async getTags(
    optPretty: boolean,
    limit: number,
    offset: string,
    workspace: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTags200Response> {
    const query = this.tagRepository.createQueryBuilder('tag');

    if (workspace) {
      query.andWhere('tag.workspace.gid = :workspace', { workspace });
      query.leftJoinAndSelect('tag.workspace', 'workspace');
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [tags, total] = await query.getManyAndCount();
    const limitNum = limit || 100;

    const nextPage = generateNextPage(
      request as any,
      offsetNum,
      limitNum,
      total,
      offsetNum + tags.length < total,
    );

    return {
      data: tags.map(t => TagMapper.toResponse(t, optFields)),
      next_page: nextPage,
    };
  }

  async getTagsForTask(
    taskGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTags200Response> {
    // TODO: Implement getTagsForTask
    return {
      data: [],
    };
  }

  async getTagsForWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetTags200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const query = this.tagRepository.createQueryBuilder('tag')
      .where('tag.workspace.gid = :workspaceGid', { workspaceGid })
      .leftJoinAndSelect('tag.workspace', 'workspace');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [tags, total] = await query.getManyAndCount();

    return {
      data: tags.map(t => ({
        gid: t.gid,
        resource_type: 'tag',
        name: t.name,
        color: t.color as any,
      } as TagCompact)),
    };
  }

  async updateTag(
    tagGid: string,
    updateTagRequest: UpdateTagRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateTag201Response> {
    const tag = await this.tagRepository.findOne({
      where: { gid: tagGid },
      relations: ['workspace'],
    });

    if (!tag) {
      throw new NotFoundException(`Tag with gid ${tagGid} not found`);
    }

    const updateData = (updateTagRequest.data || {}) as any;
    if (updateData.name !== undefined) tag.name = updateData.name;
    if (updateData.color !== undefined && updateData.color !== null) tag.color = updateData.color;

    await this.tagRepository.save(tag);

    return {
      data: TagMapper.toResponse(tag, optFields),
    };
  }
}
