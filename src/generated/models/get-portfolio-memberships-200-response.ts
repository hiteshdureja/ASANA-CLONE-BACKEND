import { DeprecatedPortfolioMembershipCompact } from './deprecated-portfolio-membership-compact';
import { NextPage } from './next-page';


export interface GetPortfolioMemberships200Response { 
  data?: Array<DeprecatedPortfolioMembershipCompact>;
  next_page?: NextPage | null;
}

