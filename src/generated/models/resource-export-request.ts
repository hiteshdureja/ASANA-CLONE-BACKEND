import { ResourceExportRequestParameter } from './resource-export-request-parameter';


/**
 * A *resource_export* request starts a job to bulk export objects for one or more resources.
 */
export interface ResourceExportRequest { 
  /**
   * Gid of a workspace.
   */
  workspace?: string;
  /**
   * An object containing the parameters for the export request. The keys of this object are the GIDs of the resources to be exported. The values are objects with additional parameters for each resource.
   */
  export_request_parameters?: Array<ResourceExportRequestParameter>;
}

