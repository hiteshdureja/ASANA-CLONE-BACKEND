import { UserCompact } from './user-compact';
import { NextPage } from './next-page';


export interface GetUsers200Response { 
  data?: Array<UserCompact>;
  next_page?: NextPage | null;
}

