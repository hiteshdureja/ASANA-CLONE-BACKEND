

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface RateUpdateRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The monetary value of the rate.
   */
  rate?: number;
}

