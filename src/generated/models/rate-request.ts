

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface RateRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Globally unique ID of the parent object: project.
   */
  parent: string;
  /**
   * Globally unique ID of the resource object: user or placeholder.
   */
  resource: string;
  /**
   * The monetary value of the rate.
   */
  rate: number;
}

