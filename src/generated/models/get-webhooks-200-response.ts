import { WebhookResponse } from './webhook-response';
import { NextPage } from './next-page';


export interface GetWebhooks200Response { 
  data?: Array<WebhookResponse>;
  next_page?: NextPage | null;
}

