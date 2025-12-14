import { CustomTypeResponse } from './custom-type-response';
import { NextPage } from './next-page';


export interface GetCustomTypes200Response { 
  data?: Array<CustomTypeResponse>;
  next_page?: NextPage | null;
}

