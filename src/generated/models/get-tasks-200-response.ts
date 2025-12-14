import { TaskCompact } from './task-compact';
import { NextPage } from './next-page';


export interface GetTasks200Response { 
  data?: Array<TaskCompact>;
  next_page?: NextPage | null;
}

