

/**
 * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>teams:read</code></p>  A *team* is used to group related projects and people together within an organization. Each project in an organization is associated with a team.
 */
export interface TeamCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the team.
   */
  name?: string;
}

