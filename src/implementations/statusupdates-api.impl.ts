import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { StatusUpdatesApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  CreateStatusForObjectRequest,
  GetStatus200Response,
  GetStatusesForObject200Response,
  StatusUpdateCompact,
  NextPage,
} from '../generated/models';
import { StatusUpdate } from '../entities/status-update.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class StatusUpdatesApiImpl extends StatusUpdatesApi {
  constructor(
    @InjectRepository(StatusUpdate)
    private statusUpdateRepository: Repository<StatusUpdate>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async createStatusForObject(
    createStatusForObjectRequest: CreateStatusForObjectRequest,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetStatus200Response> {
    const statusData = (createStatusForObjectRequest.data || {}) as any;
    
    if (!statusData.title) {
      throw new BadRequestException('Status title is required');
    }

    const status = this.statusUpdateRepository.create({
      gid: generateGid('status_update'),
      title: statusData.title,
      text: statusData.text,
      htmlText: statusData.html_text,
      statusType: statusData.status_type,
      resourceSubtype: statusData.resource_subtype,
    });

    if (statusData.parent) {
      const parent = await this.projectRepository.findOne({
        where: { gid: statusData.parent },
      });
      if (parent) {
        status.parent = parent;
      }
    }

    if (statusData.author) {
      const author = await this.userRepository.findOne({
        where: { gid: statusData.author },
      });
      if (author) {
        status.author = author;
        status.createdBy = author;
      }
    }

    const savedStatus = await this.statusUpdateRepository.save(status);

    const statusWithRelations = await this.statusUpdateRepository.findOne({
      where: { gid: savedStatus.gid },
      relations: ['parent', 'author', 'createdBy'],
    });

    if (!statusWithRelations) {
      throw new NotFoundException(`Status update with gid ${savedStatus.gid} not found`);
    }

    return {
      data: {
        gid: statusWithRelations.gid,
        resource_type: 'status_update',
        title: statusWithRelations.title,
        text: statusWithRelations.text,
        html_text: statusWithRelations.htmlText,
        status_type: statusWithRelations.statusType as any,
        resource_subtype: statusWithRelations.resourceSubtype as any,
        created_at: statusWithRelations.createdAt.toISOString(),
        modified_at: statusWithRelations.modifiedAt.toISOString(),
        author: statusWithRelations.author ? {
          gid: statusWithRelations.author.gid,
          name: statusWithRelations.author.name,
        } : undefined,
        created_by: statusWithRelations.createdBy ? {
          gid: statusWithRelations.createdBy.gid,
          name: statusWithRelations.createdBy.name,
        } : undefined,
        parent: statusWithRelations.parent ? {
          gid: statusWithRelations.parent.gid,
          name: statusWithRelations.parent.name,
        } : undefined,
      },
    };
  }

  async deleteStatus(
    statusUpdateGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const status = await this.statusUpdateRepository.findOne({
      where: { gid: statusUpdateGid },
    });

    if (!status) {
      throw new NotFoundException(`Status update with gid ${statusUpdateGid} not found`);
    }

    await this.statusUpdateRepository.remove(status);
    return { data: {} };
  }

  async getStatus(
    statusUpdateGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetStatus200Response> {
    const status = await this.statusUpdateRepository.findOne({
      where: { gid: statusUpdateGid },
      relations: ['parent', 'author', 'createdBy'],
    });

    if (!status) {
      throw new NotFoundException(`Status update with gid ${statusUpdateGid} not found`);
    }

    return {
      data: {
        gid: status.gid,
        resource_type: 'status_update',
        title: status.title,
        text: status.text,
        html_text: status.htmlText,
        status_type: status.statusType as any,
        resource_subtype: status.resourceSubtype as any,
        created_at: status.createdAt.toISOString(),
        modified_at: status.modifiedAt.toISOString(),
        author: status.author ? {
          gid: status.author.gid,
          name: status.author.name,
        } : undefined,
        created_by: status.createdBy ? {
          gid: status.createdBy.gid,
          name: status.createdBy.name,
        } : undefined,
        parent: status.parent ? {
          gid: status.parent.gid,
          name: status.parent.name,
        } : undefined,
      },
    };
  }

  async getStatusesForObject(
    parent: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    createdSince: string,
    optFields: any[],
    request: Request,
  ): Promise<GetStatusesForObject200Response> {
    const parentProject = await this.projectRepository.findOne({
      where: { gid: parent },
    });

    if (!parentProject) {
      throw new NotFoundException(`Parent object with gid ${parent} not found`);
    }

    const query = this.statusUpdateRepository.createQueryBuilder('status')
      .where('status.parent.id = :parentId', { parentId: parentProject.id })
      .leftJoinAndSelect('status.author', 'author')
      .leftJoinAndSelect('status.createdBy', 'createdBy')
      .orderBy('status.createdAt', 'DESC');

    if (createdSince) {
      query.andWhere('status.createdAt >= :createdSince', { createdSince: new Date(createdSince) });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [statuses, total] = await query.getManyAndCount();

    return {
      data: statuses.map(s => ({
        gid: s.gid,
        resource_type: 'status_update',
        title: s.title,
        text: s.text,
        html_text: s.htmlText,
        status_type: s.statusType as any,
        resource_subtype: s.resourceSubtype as any,
        created_at: s.createdAt.toISOString(),
        author: s.author ? {
          gid: s.author.gid,
          name: s.author.name,
        } : undefined,
        parent: {
          gid: s.parent.gid,
          name: s.parent.name,
        },
      } as StatusUpdateCompact)),
      next_page: offsetNum + statuses.length < total
        ? { offset: String(offsetNum + statuses.length) }
        : null,
    };
  }
}
