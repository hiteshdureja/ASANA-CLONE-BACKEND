import { BatchRequestAction } from './batch-request-action';


/**
 * A request object for use in a batch request.
 */
export interface BatchRequest { 
  actions?: Array<BatchRequestAction>;
}

