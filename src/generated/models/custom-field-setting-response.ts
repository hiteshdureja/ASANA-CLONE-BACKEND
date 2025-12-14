import { CustomFieldSettingResponseAllOfParent } from './custom-field-setting-response-all-of-parent';
import { CustomFieldSettingResponseAllOfProject } from './custom-field-setting-response-all-of-project';
import { CustomFieldSettingResponseAllOfCustomField } from './custom-field-setting-response-all-of-custom-field';


export interface CustomFieldSettingResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  project?: CustomFieldSettingResponseAllOfProject;
  /**
   * `is_important` is used in the Asana web application to determine if this custom field is displayed in the list/grid view of a project or portfolio.
   */
  readonly is_important?: boolean;
  parent?: CustomFieldSettingResponseAllOfParent;
  custom_field?: CustomFieldSettingResponseAllOfCustomField;
}

