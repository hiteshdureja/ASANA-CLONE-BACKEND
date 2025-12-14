import { CustomFieldSettingResponse } from './custom-field-setting-response';
import { NextPage } from './next-page';


export interface GetCustomFieldSettingsForProject200Response { 
  data?: Array<CustomFieldSettingResponse>;
  next_page?: NextPage | null;
}

