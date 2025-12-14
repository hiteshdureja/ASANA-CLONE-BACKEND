

/**
 * Custom Types extend the types of Asana Objects, currently only Custom Tasks are supported.
 */
export interface CustomTypeCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the custom type.
   */
  name?: string;
}

