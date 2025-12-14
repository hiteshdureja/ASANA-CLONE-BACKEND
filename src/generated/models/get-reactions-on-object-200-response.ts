import { ReactionCompact } from './reaction-compact';
import { NextPage } from './next-page';


export interface GetReactionsOnObject200Response { 
  data?: Array<ReactionCompact>;
  next_page?: NextPage | null;
}

