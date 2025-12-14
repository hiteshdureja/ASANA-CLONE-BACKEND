

/**
 * A *target id* object represents the target resource that the requester wants access to.
 */
export interface AccessRequestTargetIdCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
}

