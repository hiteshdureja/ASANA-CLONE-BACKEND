

/**
 * A *member* object represents either a team or user.
 */
export interface MemberCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The type of the member (team or user)
   */
  resource_type?: string;
  /**
   * The name of the member
   */
  name?: string;
}

