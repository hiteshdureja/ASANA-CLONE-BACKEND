

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalMetricCurrentValueRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * *Conditional*. This number is the current value of a goal metric of type number.
   */
  current_number_value?: number;
}

