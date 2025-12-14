import { EventResponse } from './event-response';


/**
 * The full record for all events that have occurred since the sync token was created.
 */
export interface GetEvents200Response { 
  data?: Array<EventResponse>;
  /**
   * A sync token to be used with the next call to the /events endpoint.
   */
  sync?: string;
  /**
   * Indicates whether there are more events to pull.
   */
  has_more?: boolean;
}

