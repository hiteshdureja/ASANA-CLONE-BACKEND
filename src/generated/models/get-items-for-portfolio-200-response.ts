import { ProjectCompact } from './project-compact';
import { NextPage } from './next-page';


export interface GetItemsForPortfolio200Response { 
  data?: Array<ProjectCompact>;
  next_page?: NextPage | null;
}

