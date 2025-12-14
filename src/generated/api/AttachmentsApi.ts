import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, GetAttachment200Response, GetAttachmentsForObject200Response,  } from '../models';


@Injectable()
export abstract class AttachmentsApi {

  abstract createAttachmentForObject(parent: string, optPretty: boolean, optFields: Array<'connected_to_app' | 'created_at' | 'download_url' | 'host' | 'name' | 'parent' | 'parent.created_by' | 'parent.name' | 'parent.resource_subtype' | 'permanent_url' | 'resource_subtype' | 'size' | 'view_url'>, resourceSubtype: string, file: Blob, url: string, name: string, connectToApp: boolean,  request: Request): GetAttachment200Response | Promise<GetAttachment200Response> | Observable<GetAttachment200Response>;


  abstract deleteAttachment(attachmentGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getAttachment(attachmentGid: string, optPretty: boolean, optFields: Array<'connected_to_app' | 'created_at' | 'download_url' | 'host' | 'name' | 'parent' | 'parent.created_by' | 'parent.name' | 'parent.resource_subtype' | 'permanent_url' | 'resource_subtype' | 'size' | 'view_url'>,  request: Request): GetAttachment200Response | Promise<GetAttachment200Response> | Observable<GetAttachment200Response>;


  abstract getAttachmentsForObject(parent: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'connected_to_app' | 'created_at' | 'download_url' | 'host' | 'name' | 'offset' | 'parent' | 'parent.created_by' | 'parent.name' | 'parent.resource_subtype' | 'path' | 'permanent_url' | 'resource_subtype' | 'size' | 'uri' | 'view_url'>,  request: Request): GetAttachmentsForObject200Response | Promise<GetAttachmentsForObject200Response> | Observable<GetAttachmentsForObject200Response>;

} 