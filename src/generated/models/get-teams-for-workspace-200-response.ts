import { TeamCompact } from './team-compact';
import { NextPage } from './next-page';


export interface GetTeamsForWorkspace200Response { 
  data?: Array<TeamCompact>;
  next_page?: NextPage | null;
}

