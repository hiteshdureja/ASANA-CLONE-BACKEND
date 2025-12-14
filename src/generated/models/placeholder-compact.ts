

/**
 * A *placeholder* object represents a placeholder in Asana that can be used to represent a placeholder user.
 */
export interface PlaceholderCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The placeholder\'s name.
   */
  name?: string;
}

