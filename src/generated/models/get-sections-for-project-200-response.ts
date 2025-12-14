import { SectionCompact } from './section-compact';
import { NextPage } from './next-page';


export interface GetSectionsForProject200Response { 
  data?: Array<SectionCompact>;
  next_page?: NextPage | null;
}

