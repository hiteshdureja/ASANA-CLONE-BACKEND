

export interface CustomTypeStatusOptionResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the custom type status option.
   */
  name?: string;
  /**
   * The completion state the custom type status option corresponds to, all custom types must have one ‘Incomplete’ and ‘Complete’ status option.
   */
  completion_state?: string | null;
  /**
   * Whether or not the custom type status option is a selectable value for the custom type.
   */
  enabled?: boolean | null;
  /**
   * The color associated with the custom type status option. Defaults to ‘none’.
   */
  color?: string | null;
}

