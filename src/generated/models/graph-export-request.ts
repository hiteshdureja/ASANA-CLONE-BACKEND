

/**
 * A *graph_export* request starts a job to export data starting from a parent object.
 */
export interface GraphExportRequest { 
  /**
   * Globally unique ID of the parent object: goal, project, portfolio, or team.
   */
  parent?: string;
}

