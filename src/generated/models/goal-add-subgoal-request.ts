

export interface GoalAddSubgoalRequest { 
  /**
   * The goal gid to add as subgoal to a parent goal
   */
  subgoal: string;
  /**
   * An id of a subgoal of this parent goal. The new subgoal will be added before the one specified here. `insert_before` and `insert_after` parameters cannot both be specified.
   */
  insert_before?: string;
  /**
   * An id of a subgoal of this parent goal. The new subgoal will be added after the one specified here. `insert_before` and `insert_after` parameters cannot both be specified.
   */
  insert_after?: string;
}

