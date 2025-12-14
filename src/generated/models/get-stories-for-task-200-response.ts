import { StoryCompact } from './story-compact';
import { NextPage } from './next-page';


export interface GetStoriesForTask200Response { 
  data?: Array<StoryCompact>;
  next_page?: NextPage | null;
}

