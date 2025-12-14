import { DateVariableRequest } from './date-variable-request';
import { RequestedRoleRequest } from './requested-role-request';


export interface ProjectTemplateInstantiateProjectRequest { 
  /**
   * The name of the new project.
   */
  name: string;
  /**
   * *Optional*. Sets the team of the new project. If the project template exists in an _organization_, you may specify a value for `team`. If no value is provided then it defaults to the same team as the project template.
   */
  team?: string;
  /**
   * *Deprecated:* new integrations use `privacy_setting` instead.
   * @deprecated
   */
  'public'?: boolean;
  /**
   * The privacy setting of the project. *Note: Administrators in your organization may restrict the values of `privacy_setting`.*
   */
  privacy_setting?: ProjectTemplateInstantiateProjectRequest.PrivacySettingEnum;
  /**
   * *Optional*. If set to `true`, the endpoint returns an \"Unprocessable Entity\" error if you fail to provide a calendar date value for any date variable. If set to `false`, a default date is used for each unfulfilled date variable (e.g., the current date is used as the Start Date of a project).
   */
  is_strict?: boolean;
  /**
   * *Conditional*. Array of mappings of date variables to calendar dates. This property is required in the instantiation request if the project template includes dates (e.g., a start date on a task).
   */
  requested_dates?: Array<DateVariableRequest>;
  /**
   * Array of mappings of template roles to user ids
   */
  requested_roles?: Array<RequestedRoleRequest>;
}
export namespace ProjectTemplateInstantiateProjectRequest {
  export const PrivacySettingEnum = {
    PublicToWorkspace: 'public_to_workspace',
    PrivateToTeam: 'private_to_team',
    Private: 'private'
  } as const;
  export type PrivacySettingEnum = typeof PrivacySettingEnum[keyof typeof PrivacySettingEnum];
}


