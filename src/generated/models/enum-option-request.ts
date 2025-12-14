

export interface EnumOptionRequest { 
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
  /**
   * An existing enum option within this custom field before which the new enum option should be inserted. Cannot be provided together with after_enum_option.
   */
  insert_before?: string;
  /**
   * An existing enum option within this custom field after which the new enum option should be inserted. Cannot be provided together with before_enum_option.
   */
  insert_after?: string;
}

