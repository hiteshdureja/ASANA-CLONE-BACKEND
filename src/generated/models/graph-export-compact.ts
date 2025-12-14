

/**
 * A *graph_export* object represents a request to export the data starting from a parent object
 */
export interface GraphExportCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * Download this URL to retrieve the full export in JSON format. It will be compressed in a gzip (.gz) container.  *Note: May be null if the export is still in progress or failed.  If present, this URL may only be valid for 1 hour from the time of retrieval. You should avoid persisting this URL somewhere and rather refresh on demand to ensure you do not keep stale URLs.*
   */
  readonly download_url?: string | null;
  /**
   * The time at which this resource was completed.
   */
  readonly completed_at?: string;
}

