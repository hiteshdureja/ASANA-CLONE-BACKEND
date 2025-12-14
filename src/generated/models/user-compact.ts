

/**
 * A *user* object represents an account in Asana that can be given access to various workspaces, projects, and tasks.
 */
export interface UserCompact { 
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
}

