

/**
 * Filters to apply to a resource that will be exported. These filters can be used to narrow down the resources that are included in the export.
 */
export interface ResourceExportFilters { 
  /**
   * Filter by the users who assigned the resource. This array accepts a list of user GIDs. This is only applicable to tasks.
   */
  'assigned_by.any'?: Array<string>;
  /**
   * Filter by the users who are assigned to the resource. This array accepts a list of user GIDs. This is only applicable to tasks.
   */
  'assignee.any'?: Array<string>;
  /**
   * Filter by the users who commented on the resource. This array accepts a list of user GIDs.
   */
  'commented_on_by.any'?: Array<string>;
  /**
   * Filter results to resources created after a specified date and time.
   */
  'created_at.after'?: string;
  /**
   * Filter results to resources created before a specified date and time.
   */
  'created_at.before'?: string;
  /**
   * Filter by the users who created the resource. This array accepts a list of user GIDs.
   */
  'created_by.any'?: Array<string>;
  /**
   * Filter by the users who are following the resource. This array accepts a list of user GIDs.
   */
  'followers.any'?: Array<string>;
  /**
   * Filter by the users who liked the resource. This array accepts a list of user GIDs.
   */
  'liked_by.any'?: Array<string>;
  /**
   * Filter results to resources modified after a specified date and time.
   */
  'modified_at.after'?: string;
  /**
   * Filter results to resources modified before a specified date and time.
   */
  'modified_at.before'?: string;
}

