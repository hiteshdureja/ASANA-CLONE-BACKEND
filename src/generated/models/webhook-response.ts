import { WebhookResponseAllOfFilters } from './webhook-response-all-of-filters';
import { AsanaNamedResource } from './asana-named-resource';


export interface WebhookResponse { 
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
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * The timestamp when the webhook last received an error when sending an event to the target.
   */
  readonly last_failure_at?: string;
  /**
   * The contents of the last error response sent to the webhook when attempting to deliver events to the target.
   */
  readonly last_failure_content?: string;
  /**
   * The timestamp when the webhook last successfully sent an event to the target.
   */
  readonly last_success_at?: string;
  /**
   * The number of times the webhook has retried delivery of events to the target (resets after a successful attempt).
   */
  readonly delivery_retry_count?: number;
  /**
   * The timestamp after which the webhook will next attempt to deliver an event to the target.
   */
  readonly next_attempt_after?: string;
  /**
   * The timestamp when the webhook will be deleted if there is no successful attempt to deliver events to the target
   */
  readonly failure_deletion_timestamp?: string;
  /**
   * Whitelist of filters to apply to events from this webhook. If a webhook event passes any of the filters the event will be delivered; otherwise no event will be sent to the receiving server.
   */
  filters?: Array<WebhookResponseAllOfFilters>;
}

