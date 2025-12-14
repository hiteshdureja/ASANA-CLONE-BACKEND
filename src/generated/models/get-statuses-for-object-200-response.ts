import { StatusUpdateCompact } from './status-update-compact';
import { NextPage } from './next-page';


export interface GetStatusesForObject200Response { 
  data?: Array<StatusUpdateCompact>;
  next_page?: NextPage | null;
}

