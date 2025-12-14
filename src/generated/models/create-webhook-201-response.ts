import { WebhookResponse } from './webhook-response';


export interface CreateWebhook201Response { 
  data?: WebhookResponse;
  /**
   * The secret to be used to verify future webhook event signatures.
   */
  'X-Hook-Secret'?: string;
}

