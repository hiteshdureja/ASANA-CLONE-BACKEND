import { ProjectMembershipCompact } from './project-membership-compact';
import { NextPage } from './next-page';


export interface GetProjectMembershipsForProject200Response { 
  data?: Array<ProjectMembershipCompact>;
  next_page?: NextPage | null;
}

