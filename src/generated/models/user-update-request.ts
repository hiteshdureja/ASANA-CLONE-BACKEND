

export interface UserUpdateRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * *Read-only except when same user as requester*. The user\'s name.
   */
  name?: string;
  /**
   * An object where each key is the GID of a custom field and its corresponding value is either an enum GID, string, number, or object (depending on the custom field type). See the [custom fields guide](/docs/custom-fields-guide) for details on creating and updating custom field values.
   */
  custom_fields?: { [key: string]: string; };
}

