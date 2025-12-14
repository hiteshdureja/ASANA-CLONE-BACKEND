

export interface WorkspaceResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the workspace.
   */
  name?: string;
  /**
   * The email domains that are associated with this workspace.
   */
  email_domains?: Array<string>;
  /**
   * Whether the workspace is an *organization*.
   */
  is_organization?: boolean;
}

