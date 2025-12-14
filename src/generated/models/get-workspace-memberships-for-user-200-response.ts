import { NextPage } from './next-page';
import { WorkspaceMembershipCompact } from './workspace-membership-compact';


export interface GetWorkspaceMembershipsForUser200Response { 
  data?: Array<WorkspaceMembershipCompact>;
  next_page?: NextPage | null;
}

