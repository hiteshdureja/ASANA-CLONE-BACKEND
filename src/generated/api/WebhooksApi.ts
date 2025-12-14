import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateWebhook201Response, CreateWebhookRequest, GetWebhook200Response, GetWebhooks200Response, UpdateWebhookRequest,  } from '../models';


@Injectable()
export abstract class WebhooksApi {

  abstract createWebhook(createWebhookRequest: CreateWebhookRequest, optPretty: boolean, optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'resource' | 'resource.name' | 'target'>,  request: Request): CreateWebhook201Response | Promise<CreateWebhook201Response> | Observable<CreateWebhook201Response>;


  abstract deleteWebhook(webhookGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getWebhook(webhookGid: string, optPretty: boolean, optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'resource' | 'resource.name' | 'target'>,  request: Request): GetWebhook200Response | Promise<GetWebhook200Response> | Observable<GetWebhook200Response>;


  abstract getWebhooks(workspace: string, optPretty: boolean, limit: number, offset: string, resource: string, optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'offset' | 'path' | 'resource' | 'resource.name' | 'target' | 'uri'>,  request: Request): GetWebhooks200Response | Promise<GetWebhooks200Response> | Observable<GetWebhooks200Response>;


  abstract updateWebhook(webhookGid: string, updateWebhookRequest: UpdateWebhookRequest, optPretty: boolean, optFields: Array<'active' | 'created_at' | 'delivery_retry_count' | 'failure_deletion_timestamp' | 'filters' | 'filters.action' | 'filters.fields' | 'filters.resource_subtype' | 'last_failure_at' | 'last_failure_content' | 'last_success_at' | 'next_attempt_after' | 'resource' | 'resource.name' | 'target'>,  request: Request): GetWebhook200Response | Promise<GetWebhook200Response> | Observable<GetWebhook200Response>;

} 