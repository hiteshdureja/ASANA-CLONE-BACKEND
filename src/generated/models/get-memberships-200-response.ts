import { MembershipCompact } from './membership-compact';
import { NextPage } from './next-page';


export interface GetMemberships200Response { 
  data?: Array<MembershipCompact>;
  next_page?: NextPage | null;
}

