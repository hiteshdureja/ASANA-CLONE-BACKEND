import { ProjectTemplateCompact } from './project-template-compact';
import { CustomFieldSettingResponse } from './custom-field-setting-response';
import { PortfolioResponseAllOfWorkspace } from './portfolio-response-all-of-workspace';
import { StatusUpdateCompact } from './status-update-compact';
import { UserCompact } from './user-compact';
import { CustomFieldCompact } from './custom-field-compact';


export interface PortfolioResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the portfolio.
   */
  name?: string;
  /**
   * [Opt In](/docs/inputoutput-options). True if the portfolio is archived, false if not. Archived portfolios do not show in the UI by default and may be treated differently for queries.
   */
  archived?: boolean;
  /**
   * Color of the portfolio.
   */
  color?: PortfolioResponse.ColorEnum;
  /**
   * The day on which work for this portfolio begins, or null if the portfolio has no start date. This takes a date with `YYYY-MM-DD` format. *Note: `due_on` must be present in the request when setting or unsetting the `start_on` parameter. Additionally, `start_on` and `due_on` cannot be the same date.*
   */
  start_on?: string | null;
  /**
   * The day on which this portfolio is due. This takes a date with format YYYY-MM-DD.
   */
  due_on?: string | null;
  /**
   * The default access level when inviting new members to the portfolio
   */
  default_access_level?: PortfolioResponse.DefaultAccessLevelEnum;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  created_by?: UserCompact;
  /**
   * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>custom_fields:read</code></p>  Array of custom field settings applied to the portfolio.
   */
  custom_field_settings?: Array<CustomFieldSettingResponse>;
  /**
   * The latest `status_update` posted to this portfolio.
   */
  current_status_update?: StatusUpdateCompact | null;
  /**
   * Array of Custom Fields.
   */
  custom_fields?: Array<CustomFieldCompact>;
  readonly members?: Array<UserCompact>;
  owner?: UserCompact;
  workspace?: PortfolioResponseAllOfWorkspace;
  /**
   * A url that points directly to the object within Asana.
   */
  readonly permalink_url?: string;
  /**
   * True if the portfolio is public to its workspace members.
   */
  'public'?: boolean;
  /**
   * The privacy setting of the portfolio. *Note: Administrators in your organization may restrict the values of `privacy_setting`.*
   */
  privacy_setting?: PortfolioResponse.PrivacySettingEnum;
  /**
   * Array of project templates that are in the portfolio
   */
  readonly project_templates?: Array<ProjectTemplateCompact>;
}
export namespace PortfolioResponse {
  export const ColorEnum = {
    DarkPink: 'dark-pink',
    DarkGreen: 'dark-green',
    DarkBlue: 'dark-blue',
    DarkRed: 'dark-red',
    DarkTeal: 'dark-teal',
    DarkBrown: 'dark-brown',
    DarkOrange: 'dark-orange',
    DarkPurple: 'dark-purple',
    DarkWarmGray: 'dark-warm-gray',
    LightPink: 'light-pink',
    LightGreen: 'light-green',
    LightBlue: 'light-blue',
    LightRed: 'light-red',
    LightTeal: 'light-teal',
    LightBrown: 'light-brown',
    LightOrange: 'light-orange',
    LightPurple: 'light-purple',
    LightWarmGray: 'light-warm-gray'
  } as const;
  export type ColorEnum = typeof ColorEnum[keyof typeof ColorEnum];
  export const DefaultAccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Viewer: 'viewer'
  } as const;
  export type DefaultAccessLevelEnum = typeof DefaultAccessLevelEnum[keyof typeof DefaultAccessLevelEnum];
  export const PrivacySettingEnum = {
    PublicToDomain: 'public_to_domain',
    MembersOnly: 'members_only'
  } as const;
  export type PrivacySettingEnum = typeof PrivacySettingEnum[keyof typeof PrivacySettingEnum];
}


