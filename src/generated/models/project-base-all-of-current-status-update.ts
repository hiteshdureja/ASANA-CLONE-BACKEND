

export interface ProjectBaseAllOfCurrentStatusUpdate { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The title of the status update.
   */
  title?: string;
  /**
   * The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. The `resource_subtype`s for `status` objects represent the type of their parent.
   */
  readonly resource_subtype?: ProjectBaseAllOfCurrentStatusUpdate.ResourceSubtypeEnum;
}
export namespace ProjectBaseAllOfCurrentStatusUpdate {
  export const ResourceSubtypeEnum = {
    ProjectStatusUpdate: 'project_status_update',
    PortfolioStatusUpdate: 'portfolio_status_update',
    GoalStatusUpdate: 'goal_status_update'
  } as const;
  export type ResourceSubtypeEnum = typeof ResourceSubtypeEnum[keyof typeof ResourceSubtypeEnum];
}


