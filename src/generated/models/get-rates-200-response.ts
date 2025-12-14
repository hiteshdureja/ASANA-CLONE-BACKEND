import { RateOrPlaceholderCompact } from './rate-or-placeholder-compact';
import { NextPage } from './next-page';


export interface GetRates200Response { 
  data?: Array<RateOrPlaceholderCompact>;
  next_page?: NextPage | null;
}

