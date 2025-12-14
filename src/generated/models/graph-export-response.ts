import { GraphExportCompact } from './graph-export-compact';


/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GraphExportResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * A *graph_export* object represents a request to export the data starting from a parent object
   */
  readonly resource_subtype?: string;
  /**
   * The current status of this job.
   */
  readonly status?: GraphExportResponse.StatusEnum;
  new_graph_export?: GraphExportCompact;
}
export namespace GraphExportResponse {
  export const StatusEnum = {
    NotStarted: 'not_started',
    InProgress: 'in_progress',
    Succeeded: 'succeeded',
    Failed: 'failed'
  } as const;
  export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
}


