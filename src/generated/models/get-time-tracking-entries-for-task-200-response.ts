import { TimeTrackingEntryCompact } from './time-tracking-entry-compact';
import { NextPage } from './next-page';


export interface GetTimeTrackingEntriesForTask200Response { 
  data?: Array<TimeTrackingEntryCompact>;
  next_page?: NextPage | null;
}

