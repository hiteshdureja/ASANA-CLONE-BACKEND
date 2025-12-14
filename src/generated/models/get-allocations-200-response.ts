import { AllocationResponse } from './allocation-response';
import { NextPage } from './next-page';


export interface GetAllocations200Response { 
  data?: Array<AllocationResponse>;
  next_page?: NextPage | null;
}

