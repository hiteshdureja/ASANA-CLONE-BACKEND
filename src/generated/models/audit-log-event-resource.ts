

/**
 * The primary object that was affected by this event.
 */
export interface AuditLogEventResource { 
  /**
   * The type of resource.
   */
  resource_type?: string;
  /**
   * The subtype of resource. Most resources will not have a subtype.
   */
  resource_subtype?: string;
  /**
   * Globally unique identifier of the resource.
   */
  gid?: string;
  /**
   * The name of the resource.
   */
  name?: string | null;
  /**
   * The email of the resource, if applicable.
   */
  email?: string;
}

