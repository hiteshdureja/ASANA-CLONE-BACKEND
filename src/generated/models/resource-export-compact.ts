

/**
 * A *resource_export* object represents a request to bulk export objects for one or more resources.
 */
export interface ResourceExportCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The time at which the resource export object was created.
   */
  readonly created_at?: string;
  /**
   * Download this URL to retrieve the full export in [JSON Lines](https://jsonlines.org/) format. It will be compressed in a gzip (.gz) container.  *Note: May be null if the export is still in progress or failed.*
   */
  readonly download_url?: string | null;
  /**
   * The time at which this resource was completed. This will be null if the export is still in progress.
   */
  readonly completed_at?: string;
}

