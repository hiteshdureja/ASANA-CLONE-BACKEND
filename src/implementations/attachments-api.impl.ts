import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { AttachmentsApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  GetAttachment200Response,
  GetAttachmentsForObject200Response,
  AttachmentCompact,
  NextPage,
} from '../generated/models';
import { Attachment } from '../entities/attachment.entity';
import { Task } from '../entities/task.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class AttachmentsApiImpl extends AttachmentsApi {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super();
  }

  async createAttachmentForObject(
    parent: string,
    optPretty: boolean,
    optFields: any[],
    resourceSubtype: string,
    file: Blob,
    url: string,
    name: string,
    connectToApp: boolean,
    request: Request,
  ): Promise<GetAttachment200Response> {
    const task = await this.taskRepository.findOne({
      where: { gid: parent },
    });

    if (!task) {
      throw new NotFoundException(`Parent object with gid ${parent} not found`);
    }

    if (!name && !url) {
      throw new BadRequestException('Either name or url is required');
    }

    const attachment = this.attachmentRepository.create({
      gid: generateGid('attachment'),
      name: name || 'Attachment',
      resourceSubtype: resourceSubtype || 'asana',
      downloadUrl: url,
      viewUrl: url,
      permanentUrl: url,
      connectedToApp: connectToApp,
      parent: task,
    });

    const savedAttachment = await this.attachmentRepository.save(attachment);

    const attachmentWithRelations = await this.attachmentRepository.findOne({
      where: { gid: savedAttachment.gid },
      relations: ['parent', 'parent.createdBy'],
    });

    if (!attachmentWithRelations) {
      throw new NotFoundException(`Attachment with gid ${savedAttachment.gid} not found`);
    }

    return {
      data: {
        gid: attachmentWithRelations.gid,
        resource_type: 'attachment',
        name: attachmentWithRelations.name,
        resource_subtype: attachmentWithRelations.resourceSubtype as any,
        download_url: attachmentWithRelations.downloadUrl,
        view_url: attachmentWithRelations.viewUrl,
        permanent_url: attachmentWithRelations.permanentUrl,
        host: attachmentWithRelations.host as any,
        size: attachmentWithRelations.size,
        connected_to_app: attachmentWithRelations.connectedToApp,
        created_at: attachmentWithRelations.createdAt.toISOString(),
        parent: attachmentWithRelations.parent ? {
          gid: attachmentWithRelations.parent.gid,
          name: attachmentWithRelations.parent.name,
          resource_subtype: attachmentWithRelations.parent.resourceSubtype as any,
          created_by: attachmentWithRelations.parent.createdBy ? {
            gid: attachmentWithRelations.parent.createdBy.gid,
            resource_type: 'user',
          } : undefined,
        } : undefined,
      },
    };
  }

  async deleteAttachment(
    attachmentGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const attachment = await this.attachmentRepository.findOne({
      where: { gid: attachmentGid },
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with gid ${attachmentGid} not found`);
    }

    await this.attachmentRepository.remove(attachment);
    return { data: {} };
  }

  async getAttachment(
    attachmentGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetAttachment200Response> {
    const attachment = await this.attachmentRepository.findOne({
      where: { gid: attachmentGid },
      relations: ['parent', 'parent.createdBy'],
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with gid ${attachmentGid} not found`);
    }

    return {
      data: {
        gid: attachment.gid,
        resource_type: 'attachment',
        name: attachment.name,
        resource_subtype: attachment.resourceSubtype as any,
        download_url: attachment.downloadUrl,
        view_url: attachment.viewUrl,
        permanent_url: attachment.permanentUrl,
        host: attachment.host as any,
        size: attachment.size,
        connected_to_app: attachment.connectedToApp,
        created_at: attachment.createdAt.toISOString(),
        parent: attachment.parent ? {
          gid: attachment.parent.gid,
          name: attachment.parent.name,
          resource_subtype: attachment.parent.resourceSubtype as any,
          created_by: attachment.parent.createdBy ? {
            gid: attachment.parent.createdBy.gid,
            resource_type: 'user',
          } : undefined,
        } : undefined,
      },
    };
  }

  async getAttachmentsForObject(
    parent: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetAttachmentsForObject200Response> {
    const task = await this.taskRepository.findOne({
      where: { gid: parent },
    });

    if (!task) {
      throw new NotFoundException(`Parent object with gid ${parent} not found`);
    }

    const query = this.attachmentRepository.createQueryBuilder('attachment')
      .where('attachment.parent.id = :taskId', { taskId: task.id })
      .leftJoinAndSelect('attachment.parent', 'parent')
      .leftJoinAndSelect('parent.createdBy', 'createdBy')
      .orderBy('attachment.createdAt', 'DESC');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [attachments, total] = await query.getManyAndCount();

    return {
      data: attachments.map(a => ({
        gid: a.gid,
        resource_type: 'attachment',
        name: a.name,
        resource_subtype: a.resourceSubtype as any,
        download_url: a.downloadUrl,
        view_url: a.viewUrl,
        permanent_url: a.permanentUrl,
        host: a.host as any,
        size: a.size,
        connected_to_app: a.connectedToApp,
        created_at: a.createdAt.toISOString(),
        parent: a.parent ? {
          gid: a.parent.gid,
          name: a.parent.name,
          resource_subtype: a.parent.resourceSubtype as any,
          created_by: a.parent.createdBy ? {
            gid: a.parent.createdBy.gid,
            name: a.parent.createdBy.name,
          } : undefined,
        } : undefined,
      } as AttachmentCompact)),
      next_page: offsetNum + attachments.length < total
        ? { offset: String(offsetNum + attachments.length) }
        : null,
    };
  }
}
