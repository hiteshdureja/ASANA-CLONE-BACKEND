import { WebhookResponseAllOfFilters } from './webhook-response-all-of-filters';


export interface WebhookUpdateRequest { 
  /**
   * An array of WebhookFilter objects to specify a whitelist of filters to apply to events from this webhook. If a webhook event passes any of the filters the event will be delivered; otherwise no event will be sent to the receiving server.
   */
  filters?: Array<WebhookResponseAllOfFilters>;
}

