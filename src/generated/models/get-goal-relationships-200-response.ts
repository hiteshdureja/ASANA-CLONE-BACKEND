import { GoalRelationshipCompact } from './goal-relationship-compact';
import { NextPage } from './next-page';


export interface GetGoalRelationships200Response { 
  data?: Array<GoalRelationshipCompact>;
  next_page?: NextPage | null;
}

