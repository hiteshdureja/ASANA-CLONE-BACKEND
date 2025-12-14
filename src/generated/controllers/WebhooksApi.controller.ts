import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WebhooksApi } from '../api';
import type { ApproveAccessRequest200Response, CreateWebhook201Response, CreateWebhookRequest, GetWebhook200Response, GetWebhooks200Response, UpdateWebhookRequest,  } from '../models';

@Controller()
export class WebhooksApiController {
  constructor(private readonly webhooksApi: WebhooksApi) {}

  @Post('/webhooks')
  createWebhook(@Body() createWebhookRequest: CreateWebhookRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'resource' | 'resource.name' | 'target'>, @Req() request: Request): CreateWebhook201Response | Promise<CreateWebhook201Response> | Observable<CreateWebhook201Response> {
    return this.webhooksApi.createWebhook(createWebhookRequest, optPretty, optFields, request);
  }

  @Delete('/webhooks/:webhook_gid')
  deleteWebhook(@Param('webhookGid') webhookGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.webhooksApi.deleteWebhook(webhookGid, optPretty, request);
  }

  @Get('/webhooks/:webhook_gid')
  getWebhook(@Param('webhookGid') webhookGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'resource' | 'resource.name' | 'target'>, @Req() request: Request): GetWebhook200Response | Promise<GetWebhook200Response> | Observable<GetWebhook200Response> {
    return this.webhooksApi.getWebhook(webhookGid, optPretty, optFields, request);
  }

  @Get('/webhooks')
  getWebhooks(@Query('workspace') workspace: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('resource') resource: string, @Query('optFields') optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'offset' | 'path' | 'resource' | 'resource.name' | 'target' | 'uri'>, @Req() request: Request): GetWebhooks200Response | Promise<GetWebhooks200Response> | Observable<GetWebhooks200Response> {
    return this.webhooksApi.getWebhooks(workspace, optPretty, limit, offset, resource, optFields, request);
  }

  @Put('/webhooks/:webhook_gid')
  updateWebhook(@Param('webhookGid') webhookGid: string, @Body() updateWebhookRequest: UpdateWebhookRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'resource' | 'resource.name' | 'target'>, @Req() request: Request): GetWebhook200Response | Promise<GetWebhook200Response> | Observable<GetWebhook200Response> {
    return this.webhooksApi.updateWebhook(webhookGid, updateWebhookRequest, optPretty, optFields, request);
  }

} 