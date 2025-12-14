import { ProjectBaseAllOfCurrentStatus } from './project-base-all-of-current-status';
import { CustomFieldSettingResponse } from './custom-field-setting-response';
import { ProjectBaseAllOfCurrentStatusUpdate } from './project-base-all-of-current-status-update';
import { UserCompact } from './user-compact';


export interface ProjectUpdateRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Name of the project. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer.
   */
  name?: string;
  /**
   * True if the project is archived, false if not. Archived projects do not show in the UI by default and may be treated differently for queries.
   */
  archived?: boolean;
  /**
   * Color of the project.
   */
  color?: ProjectUpdateRequest.ColorEnum | null;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  current_status?: ProjectBaseAllOfCurrentStatus;
  current_status_update?: ProjectBaseAllOfCurrentStatusUpdate;
  /**
   * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>custom_fields:read</code></p>  Array of Custom Field Settings (in compact form).
   */
  readonly custom_field_settings?: Array<CustomFieldSettingResponse>;
  /**
   * The default view (list, board, calendar, or timeline) of a project.
   */
  default_view?: ProjectUpdateRequest.DefaultViewEnum;
  /**
   * *Deprecated: new integrations should prefer the `due_on` field.*
   */
  due_date?: string | null;
  /**
   * The day on which this project is due. This takes a date with format YYYY-MM-DD.
   */
  due_on?: string | null;
  /**
   * [Opt In](/docs/inputoutput-options). The notes of the project with formatting as HTML.
   */
  html_notes?: string;
  /**
   * Array of users who are members of this project.
   */
  readonly members?: Array<UserCompact>;
  /**
   * The time at which this project was last modified. *Note: This does not currently reflect any changes in associations such as tasks or comments that may have been added or removed from the project.*
   */
  readonly modified_at?: string;
  /**
   * Free-form textual information associated with the project (ie., its description).
   */
  notes?: string;
  /**
   * *Deprecated:* new integrations use `privacy_setting` instead.
   * @deprecated
   */
  'public'?: boolean;
  /**
   * The privacy setting of the project. *Note: Administrators in your organization may restrict the values of `privacy_setting`.*
   */
  privacy_setting?: ProjectUpdateRequest.PrivacySettingEnum;
  /**
   * The day on which work for this project begins, or null if the project has no start date. This takes a date with `YYYY-MM-DD` format. *Note: `due_on` or `due_at` must be present in the request when setting or unsetting the `start_on` parameter. Additionally, `start_on` and `due_on` cannot be the same date.*
   */
  start_on?: string | null;
  /**
   * The default access for users or teams who join or are added as members to the project.
   */
  default_access_level?: ProjectUpdateRequest.DefaultAccessLevelEnum;
  /**
   * The minimum access level needed for project members to modify this project\'s workflow and appearance.
   */
  minimum_access_level_for_customization?: ProjectUpdateRequest.MinimumAccessLevelForCustomizationEnum;
  /**
   * The minimum access level needed for project members to share the project and manage project memberships.
   */
  minimum_access_level_for_sharing?: ProjectUpdateRequest.MinimumAccessLevelForSharingEnum;
  /**
   * An object where each key is the GID of a custom field and its corresponding value is either an enum GID, string, number, or object (depending on the custom field type). See the [custom fields guide](/docs/custom-fields-guide) for details on creating and updating custom field values.
   */
  custom_fields?: { [key: string]: string; };
  /**
   * *Create-only*. Comma separated string of users. Followers are a subset of members who have opted in to receive \"tasks added\" notifications for a project.
   */
  followers?: string;
  /**
   * The current owner of the project, may be null.
   */
  owner?: string | null;
  /**
   * The team that this project is shared with.
   */
  team?: string;
}
export namespace ProjectUpdateRequest {
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
    LightWarmGray: 'light-warm-gray',
    None: 'none'
  } as const;
  export type ColorEnum = typeof ColorEnum[keyof typeof ColorEnum];
  export const DefaultViewEnum = {
    List: 'list',
    Board: 'board',
    Calendar: 'calendar',
    Timeline: 'timeline'
  } as const;
  export type DefaultViewEnum = typeof DefaultViewEnum[keyof typeof DefaultViewEnum];
  export const PrivacySettingEnum = {
    PublicToWorkspace: 'public_to_workspace',
    PrivateToTeam: 'private_to_team',
    Private: 'private'
  } as const;
  export type PrivacySettingEnum = typeof PrivacySettingEnum[keyof typeof PrivacySettingEnum];
  export const DefaultAccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Commenter: 'commenter',
    Viewer: 'viewer'
  } as const;
  export type DefaultAccessLevelEnum = typeof DefaultAccessLevelEnum[keyof typeof DefaultAccessLevelEnum];
  export const MinimumAccessLevelForCustomizationEnum = {
    Admin: 'admin',
    Editor: 'editor'
  } as const;
  export type MinimumAccessLevelForCustomizationEnum = typeof MinimumAccessLevelForCustomizationEnum[keyof typeof MinimumAccessLevelForCustomizationEnum];
  export const MinimumAccessLevelForSharingEnum = {
    Admin: 'admin',
    Editor: 'editor'
  } as const;
  export type MinimumAccessLevelForSharingEnum = typeof MinimumAccessLevelForSharingEnum[keyof typeof MinimumAccessLevelForSharingEnum];
}


