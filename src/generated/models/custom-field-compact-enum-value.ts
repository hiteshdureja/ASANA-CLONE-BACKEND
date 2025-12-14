

export interface CustomFieldCompactEnumValue { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the enum option.
   */
  name?: string;
  /**
   * Whether or not the enum option is a selectable value for the custom field.
   */
  enabled?: boolean;
  /**
   * The color of the enum option. Defaults to `none`.
   */
  color?: string;
}

