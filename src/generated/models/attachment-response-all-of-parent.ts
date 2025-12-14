import { TaskCompactCreatedBy } from './task-compact-created-by';


export interface AttachmentResponseAllOfParent { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the task.
   */
  name?: string;
  /**
   * The resource subtype of the parent resource that the filter applies to.
   */
  resource_subtype?: string | null;
  created_by?: TaskCompactCreatedBy;
}

