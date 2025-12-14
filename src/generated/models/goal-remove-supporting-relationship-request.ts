

export interface GoalRemoveSupportingRelationshipRequest { 
  /**
   * The gid of the supporting resource to remove from the parent goal. Must be the gid of a goal, project, task, or portfolio.
   */
  supporting_resource: string;
}

