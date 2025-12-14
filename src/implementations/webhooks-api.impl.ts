import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { WebhooksApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  CreateWebhook201Response,
  CreateWebhookRequest,
  GetWebhook200Response,
  GetWebhooks200Response,
  UpdateWebhookRequest,
  WebhookCompact,
  NextPage,
} from '../generated/models';
import { Webhook } from '../entities/webhook.entity';
import { Workspace } from '../entities/workspace.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class WebhooksApiImpl extends WebhooksApi {
  constructor(
    @InjectRepository(Webhook)
    private webhookRepository: Repository<Webhook>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {
    super();
  }

  async createWebhook(
    createWebhookRequest: CreateWebhookRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateWebhook201Response> {
    const webhookData = (createWebhookRequest.data || {}) as any;

    if (!webhookData.target) {
      throw new BadRequestException('Webhook target is required');
    }

    if (!webhookData.resource) {
      throw new BadRequestException('Webhook resource is required');
    }

    const webhook = this.webhookRepository.create({
      gid: generateGid('webhook'),
      target: webhookData.target,
      resource: webhookData.resource,
      active: webhookData.active !== undefined ? webhookData.active : true,
      filters: webhookData.filters,
    });

    if (webhookData.workspace) {
      const workspace = await this.workspaceRepository.findOne({
        where: { gid: webhookData.workspace },
      });
      if (workspace) {
        webhook.workspace = workspace;
      }
    }

    const savedWebhook = await this.webhookRepository.save(webhook);

    return {
      data: {
        gid: savedWebhook.gid,
        resource_type: 'webhook',
        target: savedWebhook.target,
        resource: savedWebhook.resource ? {
          gid: savedWebhook.resource,
          name: savedWebhook.resource,
        } : undefined,
        active: savedWebhook.active,
        filters: savedWebhook.filters,
        created_at: savedWebhook.createdAt.toISOString(),
      },
    };
  }

  async deleteWebhook(
    webhookGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const webhook = await this.webhookRepository.findOne({
      where: { gid: webhookGid },
    });

    if (!webhook) {
      throw new NotFoundException(`Webhook with gid ${webhookGid} not found`);
    }

    await this.webhookRepository.remove(webhook);
    return { data: {} };
  }

  async getWebhook(
    webhookGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetWebhook200Response> {
    const webhook = await this.webhookRepository.findOne({
      where: { gid: webhookGid },
      relations: ['workspace'],
    });

    if (!webhook) {
      throw new NotFoundException(`Webhook with gid ${webhookGid} not found`);
    }

    return {
      data: {
        gid: webhook.gid,
        resource_type: 'webhook',
        target: webhook.target,
        resource: webhook.resource ? {
          gid: webhook.resource,
          name: webhook.resource,
        } : undefined,
        active: webhook.active,
        filters: webhook.filters,
        created_at: webhook.createdAt.toISOString(),
        last_success_at: webhook.lastSuccessAt?.toISOString(),
        last_failure_at: webhook.lastFailureAt?.toISOString(),
        last_failure_content: webhook.lastFailureContent,
        delivery_retry_count: webhook.deliveryRetryCount,
        next_attempt_after: webhook.nextAttemptAfter?.toISOString(),
        failure_deletion_timestamp: webhook.failureDeletionTimestamp?.toISOString(),
      },
    };
  }

  async getWebhooks(
    workspace: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    resource: string,
    optFields: any[],
    request: Request,
  ): Promise<GetWebhooks200Response> {
    const query = this.webhookRepository.createQueryBuilder('webhook');

    if (workspace) {
      query.andWhere('webhook.workspace.gid = :workspace', { workspace });
      query.leftJoinAndSelect('webhook.workspace', 'workspace');
    }

    if (resource) {
      query.andWhere('webhook.resource = :resource', { resource });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [webhooks, total] = await query.getManyAndCount();

    return {
      data: webhooks.map(w => ({
        gid: w.gid,
        resource_type: 'webhook',
        target: w.target,
        resource: w.resource ? {
          gid: w.resource,
          name: w.resource,
        } : undefined,
        active: w.active,
        created_at: w.createdAt.toISOString(),
      } as WebhookCompact)),
      next_page: offsetNum + webhooks.length < total
        ? { offset: String(offsetNum + webhooks.length) }
        : null,
    };
  }

  async updateWebhook(
    webhookGid: string,
    updateWebhookRequest: UpdateWebhookRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetWebhook200Response> {
    const webhook = await this.webhookRepository.findOne({
      where: { gid: webhookGid },
      relations: ['workspace'],
    });

    if (!webhook) {
      throw new NotFoundException(`Webhook with gid ${webhookGid} not found`);
    }

    const updateData = (updateWebhookRequest.data || {}) as any;
    if (updateData.active !== undefined) webhook.active = updateData.active;
    if (updateData.filters !== undefined) webhook.filters = updateData.filters;

    await this.webhookRepository.save(webhook);

    return {
      data: {
        gid: webhook.gid,
        resource_type: 'webhook',
        target: webhook.target,
        resource: webhook.resource ? {
          gid: webhook.resource,
          name: webhook.resource,
        } : undefined,
        active: webhook.active,
        filters: webhook.filters,
        created_at: webhook.createdAt.toISOString(),
        last_success_at: webhook.lastSuccessAt?.toISOString(),
        last_failure_at: webhook.lastFailureAt?.toISOString(),
        last_failure_content: webhook.lastFailureContent,
        delivery_retry_count: webhook.deliveryRetryCount,
        next_attempt_after: webhook.nextAttemptAfter?.toISOString(),
        failure_deletion_timestamp: webhook.failureDeletionTimestamp?.toISOString(),
      },
    };
  }
}
