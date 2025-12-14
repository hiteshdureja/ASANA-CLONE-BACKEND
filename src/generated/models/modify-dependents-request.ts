

/**
 * A set of dependent tasks.
 */
export interface ModifyDependentsRequest { 
  /**
   * An array of task gids that are dependents of the given task.
   */
  dependents?: Array<string>;
}

