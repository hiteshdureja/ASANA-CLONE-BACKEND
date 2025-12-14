

export interface GoalAddSupportingRelationshipRequest { 
  /**
   * The gid of the supporting resource to add to the parent goal. Must be the gid of a goal, project, task, or portfolio.
   */
  supporting_resource: string;
  /**
   * An id of a subgoal of this parent goal. The new subgoal will be added before the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. Currently only supported when adding a subgoal.
   */
  insert_before?: string;
  /**
   * An id of a subgoal of this parent goal. The new subgoal will be added after the one specified here. `insert_before` and `insert_after` parameters cannot both be specified. Currently only supported when adding a subgoal.
   */
  insert_after?: string;
  /**
   * Defines how much the supporting goal’s progress contributes to the parent goal’s overall progress. When used with automatically calculated [Goal Metrics](/reference/creategoalmetric) (such as `progress_source = subgoal_progress`), this value must be greater than 0 for the subgoal to count toward the parent goal’s progress. Accepts a number between 0 and 1 (inclusive). Defaults to `0`.
   */
  contribution_weight?: number;
}

