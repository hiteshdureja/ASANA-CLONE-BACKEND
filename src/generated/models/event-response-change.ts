

/**
 * Information about the type of change that has occurred. This field is only present when the value of the property `action`, describing the action taken on the **resource**, is `changed`.
 */
export interface EventResponseChange { 
  /**
   * The name of the field that has changed in the resource.
   */
  readonly field?: string;
  /**
   * The type of action taken on the **field** which has been changed.  This can be one of `changed`, `added`, or `removed` depending on the nature of the change.
   */
  readonly action?: string;
  /**
   * *Conditional.* This property is only present when the value of the event\'s `change.action` is `changed` _and_ the `new_value` is an Asana resource. This will be only the `gid` and `resource_type` of the resource when the events come from webhooks; this will be the compact representation (and can have fields expanded with [opt_fields](/docs/inputoutput-options)) when using the [get events](/reference/getevents) endpoint.
   */
  new_value?: any | null;
  /**
   * *Conditional.* This property is only present when the value of the event\'s `change.action` is `added` _and_ the `added_value` is an Asana resource. This will be only the `gid` and `resource_type` of the resource when the events come from webhooks; this will be the compact representation (and can have fields expanded with [opt_fields](/docs/inputoutput-options)) when using the [get events](/reference/getevents) endpoint.
   */
  added_value?: any | null;
  /**
   * *Conditional.* This property is only present when the value of the event\'s `change.action` is `removed` _and_ the `removed_value` is an Asana resource. This will be only the `gid` and `resource_type` of the resource when the events come from webhooks; this will be the compact representation (and can have fields expanded with [opt_fields](/docs/inputoutput-options)) when using the [get events](/reference/getevents) endpoint.
   */
  removed_value?: any | null;
}

