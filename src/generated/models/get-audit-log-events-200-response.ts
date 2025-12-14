import { AuditLogEvent } from './audit-log-event';
import { NextPage } from './next-page';


export interface GetAuditLogEvents200Response { 
  data?: Array<AuditLogEvent>;
  next_page?: NextPage | null;
}

