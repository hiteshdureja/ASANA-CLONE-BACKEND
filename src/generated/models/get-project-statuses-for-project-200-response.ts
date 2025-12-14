import { NextPage } from './next-page';
import { ProjectStatusCompact } from './project-status-compact';


export interface GetProjectStatusesForProject200Response { 
  data?: Array<ProjectStatusCompact>;
  next_page?: NextPage | null;
}

