import { TagCompact } from './tag-compact';
import { NextPage } from './next-page';


export interface GetTags200Response { 
  data?: Array<TagCompact>;
  next_page?: NextPage | null;
}

