import { WorkspaceCompact } from './workspace-compact';
import { UserCompact } from './user-compact';


/**
 * This object determines if a user is a member of a workspace.
 */
export interface WorkspaceMembershipCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  user?: UserCompact;
  workspace?: WorkspaceCompact;
}

