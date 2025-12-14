import { TeamMembershipCompact } from './team-membership-compact';
import { NextPage } from './next-page';


export interface GetTeamMemberships200Response { 
  data?: Array<TeamMembershipCompact>;
  next_page?: NextPage | null;
}

