

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface AsanaResource { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
}

