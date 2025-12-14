

/**
 * A request to create shareable access for a user.
 */
export interface AccessRequestCreateRequest { 
  /**
   * The access requestable object that the user is requesting access to. This is the gid of the target. Supports projects and portfolios.
   */
  target: string;
  /**
   * The optional message to include with the access request. This can be used to provide context or additional information about the request.
   */
  message?: string | null;
}

