import { ResourceExportCompact } from './resource-export-compact';


/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface ResourceExportResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * A *resource_export* object represents a request to bulk export objects for one or more resources.
   */
  readonly resource_subtype?: string;
  /**
   * The current status of this job.
   */
  readonly status?: ResourceExportResponse.StatusEnum;
  new_resource_export?: ResourceExportCompact;
}
export namespace ResourceExportResponse {
  export const StatusEnum = {
    NotStarted: 'not_started',
    InProgress: 'in_progress',
    Succeeded: 'succeeded',
    Failed: 'failed'
  } as const;
  export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
}


