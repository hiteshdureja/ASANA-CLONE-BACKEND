import { UserBaseResponseAllOfPhoto } from './user-base-response-all-of-photo';
import { WorkspaceCompact } from './workspace-compact';
import { CustomFieldCompact } from './custom-field-compact';


export interface UserResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * *Read-only except when same user as requester*. The user\'s name.
   */
  name?: string;
  /**
   * The user\'s email address.
   */
  readonly email?: string;
  photo?: UserBaseResponseAllOfPhoto | null;
  /**
   * Workspaces and organizations this user may access. Note\\: The API will only return workspaces and organizations that also contain the authenticated user.
   */
  readonly workspaces?: Array<WorkspaceCompact>;
  /**
   * Array of Custom Fields.
   */
  custom_fields?: Array<CustomFieldCompact>;
}

