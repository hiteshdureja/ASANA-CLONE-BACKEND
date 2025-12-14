import { GoalCompact } from './goal-compact';
import { NextPage } from './next-page';


export interface GetGoals200Response { 
  data?: Array<GoalCompact>;
  next_page?: NextPage | null;
}

