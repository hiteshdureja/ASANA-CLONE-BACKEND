import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { GetAuditLogEvents200Response } from '../models';

@Injectable()
export abstract class AuditLogAPIApi {

  abstract getAuditLogEvents(workspaceGid: string, startAt: string, endAt: string, eventType: string, actorType: 'user' | 'asana' | 'asana_support' | 'anonymous' | 'external_administrator', actorGid: string, resourceGid: string, limit: number, offset: string,  request: Request): GetAuditLogEvents200Response | Promise<GetAuditLogEvents200Response> | Observable<GetAuditLogEvents200Response>;

} 