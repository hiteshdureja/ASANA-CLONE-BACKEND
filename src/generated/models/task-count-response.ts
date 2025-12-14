

/**
 * A response object returned from the task count endpoint.
 */
export interface TaskCountResponse { 
  /**
   * The number of tasks in a project.
   */
  num_tasks?: number;
  /**
   * The number of incomplete tasks in a project.
   */
  num_incomplete_tasks?: number;
  /**
   * The number of completed tasks in a project.
   */
  num_completed_tasks?: number;
  /**
   * The number of milestones in a project.
   */
  num_milestones?: number;
  /**
   * The number of incomplete milestones in a project.
   */
  num_incomplete_milestones?: number;
  /**
   * The number of completed milestones in a project.
   */
  num_completed_milestones?: number;
}

