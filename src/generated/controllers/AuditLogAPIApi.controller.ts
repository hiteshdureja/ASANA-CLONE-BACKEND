import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuditLogAPIApi } from '../api';
import {  GetAuditLogEvents200Response,  } from '../models';

@Controller()
export class AuditLogAPIApiController {
  constructor(private readonly auditLogAPIApi: AuditLogAPIApi) {}

  @Get('/workspaces/:workspace_gid/audit_log_events')
  getAuditLogEvents(@Param('workspaceGid') workspaceGid: string, @Query('startAt') startAt: string, @Query('endAt') endAt: string, @Query('eventType') eventType: string, @Query('actorType') actorType: 'user' | 'asana' | 'asana_support' | 'anonymous' | 'external_administrator', @Query('actorGid') actorGid: string, @Query('resourceGid') resourceGid: string, @Query('limit') limit: number, @Query('offset') offset: string, @Req() request: Request): GetAuditLogEvents200Response | Promise<GetAuditLogEvents200Response> | Observable<GetAuditLogEvents200Response> {
    return this.auditLogAPIApi.getAuditLogEvents(workspaceGid, startAt, endAt, eventType, actorType, actorGid, resourceGid, limit, offset, request);
  }

} 