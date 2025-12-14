import { TeamCompact } from './team-compact';
import { UserCompact } from './user-compact';


/**
 * This object represents a user\'s connection to a team.
 */
export interface TeamMembershipCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  user?: UserCompact;
  team?: TeamCompact;
  /**
   * Describes if the user is a guest in the team.
   */
  is_guest?: boolean;
  /**
   * Describes if the user has limited access to the team.
   */
  readonly is_limited_access?: boolean;
  /**
   * Describes if the user is a team admin.
   */
  is_admin?: boolean;
}

