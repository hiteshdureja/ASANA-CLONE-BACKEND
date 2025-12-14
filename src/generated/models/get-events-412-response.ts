import { GetEvents412ResponseErrorsInner } from "./get-events-412-response-errors-inner";


export interface GetEvents412Response { 
  errors?: Array<GetEvents412ResponseErrorsInner>;
  /**
   * A sync token to be used with the next call to the /events endpoint.
   */
  readonly sync?: string;
}

