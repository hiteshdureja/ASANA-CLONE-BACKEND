import { BatchRequestActionOptions } from './batch-request-action-options';


/**
 * An action object for use in a batch request.
 */
export interface BatchRequestAction { 
  /**
   * The path of the desired endpoint relative to the API’s base URL. Query parameters are not accepted here; put them in `data` instead.
   */
  relative_path: string;
  /**
   * The HTTP method you wish to emulate for the action.
   */
  method: BatchRequestAction.MethodEnum;
  /**
   * For `GET` requests, this should be a map of query parameters you would have normally passed in the URL. Options and pagination are not accepted here; put them in `options` instead. For `POST`, `PATCH`, and `PUT` methods, this should be the content you would have normally put in the data field of the body.
   */
  data?: object;
  options?: BatchRequestActionOptions;
}
export namespace BatchRequestAction {
  export const MethodEnum = {
    Get: 'get',
    Post: 'post',
    Put: 'put',
    Delete: 'delete',
    Patch: 'patch',
    Head: 'head'
  } as const;
  export type MethodEnum = typeof MethodEnum[keyof typeof MethodEnum];
}


