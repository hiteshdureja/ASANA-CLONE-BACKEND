import { WorkspaceCompact } from './workspace-compact';
import { NextPage } from './next-page';


export interface GetWorkspaces200Response { 
  data?: Array<WorkspaceCompact>;
  next_page?: NextPage | null;
}

