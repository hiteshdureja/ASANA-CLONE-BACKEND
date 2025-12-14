import { CustomFieldResponse } from './custom-field-response';
import { NextPage } from './next-page';


export interface GetCustomFieldsForWorkspace200Response { 
  data?: Array<CustomFieldResponse>;
  next_page?: NextPage | null;
}

