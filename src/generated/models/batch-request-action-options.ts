

/**
 * Pagination (`limit` and `offset`) and output options (`fields` or `expand`) for the action. “Pretty” JSON output is not an available option on individual actions; if you want pretty output, specify that option on the parent request.
 */
export interface BatchRequestActionOptions { 
  /**
   * Pagination limit for the request.
   */
  limit?: number;
  /**
   * Pagination offset for the request.
   */
  offset?: number;
  /**
   * The fields to retrieve in the request.
   */
  fields?: Array<string>;
}

