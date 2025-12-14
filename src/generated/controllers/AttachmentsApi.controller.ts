import { Body, Controller, Delete, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AttachmentsApi } from '../api';
import { ApproveAccessRequest200Response, GetAttachment200Response, GetAttachmentsForObject200Response,  } from '../models';

@Controller()
export class AttachmentsApiController {
  constructor(private readonly attachmentsApi: AttachmentsApi) {}

  @Post('/attachments')
  createAttachmentForObject(parent: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'connected_to_app' | 'created_at' | 'download_url' | 'host' | 'name' | 'parent' | 'parent.created_by' | 'parent.name' | 'parent.resource_subtype' | 'permanent_url' | 'resource_subtype' | 'size' | 'view_url'>, resourceSubtype: string, file: Blob, url: string, name: string, connectToApp: boolean, @Req() request: Request): GetAttachment200Response | Promise<GetAttachment200Response> | Observable<GetAttachment200Response> {
    return this.attachmentsApi.createAttachmentForObject(parent, optPretty, optFields, resourceSubtype, file, url, name, connectToApp, request);
  }

  @Delete('/attachments/:attachment_gid')
  deleteAttachment(@Param('attachmentGid') attachmentGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.attachmentsApi.deleteAttachment(attachmentGid, optPretty, request);
  }

  @Get('/attachments/:attachment_gid')
  getAttachment(@Param('attachmentGid') attachmentGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'connected_to_app' | 'created_at' | 'download_url' | 'host' | 'name' | 'parent' | 'parent.created_by' | 'parent.name' | 'parent.resource_subtype' | 'permanent_url' | 'resource_subtype' | 'size' | 'view_url'>, @Req() request: Request): GetAttachment200Response | Promise<GetAttachment200Response> | Observable<GetAttachment200Response> {
    return this.attachmentsApi.getAttachment(attachmentGid, optPretty, optFields, request);
  }

  @Get('/attachments')
  getAttachmentsForObject(@Query('parent') parent: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'connected_to_app' | 'created_at' | 'download_url' | 'host' | 'name' | 'offset' | 'parent' | 'parent.created_by' | 'parent.name' | 'parent.resource_subtype' | 'path' | 'permanent_url' | 'resource_subtype' | 'size' | 'uri' | 'view_url'>, @Req() request: Request): GetAttachmentsForObject200Response | Promise<GetAttachmentsForObject200Response> | Observable<GetAttachmentsForObject200Response> {
    return this.attachmentsApi.getAttachmentsForObject(parent, optPretty, limit, offset, optFields, request);
  }

} 