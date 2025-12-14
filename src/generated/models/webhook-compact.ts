import { AsanaNamedResource } from './asana-named-resource';


/**
 * Webhook objects represent the state of an active subscription for a server to be updated with information from Asana. This schema represents the subscription itself, not the objects that are sent to the server. For information on those please refer to the [event](/reference/events) schema.
 */
export interface WebhookCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * If true, the webhook will send events - if false it is considered inactive and will not generate events.
   */
  readonly active?: boolean;
  resource?: AsanaNamedResource;
  /**
   * The URL to receive the HTTP POST.
   */
  readonly target?: string;
}

