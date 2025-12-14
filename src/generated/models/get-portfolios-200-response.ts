import { PortfolioCompact } from './portfolio-compact';
import { NextPage } from './next-page';


export interface GetPortfolios200Response { 
  data?: Array<PortfolioCompact>;
  next_page?: NextPage | null;
}

