import { TimePeriodCompact } from './time-period-compact';
import { NextPage } from './next-page';


export interface GetTimePeriods200Response { 
  data?: Array<TimePeriodCompact>;
  next_page?: NextPage | null;
}

