

export interface StatusUpdateBase { 
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
  readonly resource_subtype?: StatusUpdateBase.ResourceSubtypeEnum;
  /**
   * The text content of the status update.
   */
  text: string;
  /**
   * [Opt In](/docs/inputoutput-options). The text content of the status update with formatting as HTML.
   */
  html_text?: string;
  /**
   * The type associated with the status update. This represents the current state of the object this object is on.
   */
  status_type: StatusUpdateBase.StatusTypeEnum;
}
export namespace StatusUpdateBase {
  export const ResourceSubtypeEnum = {
    ProjectStatusUpdate: 'project_status_update',
    PortfolioStatusUpdate: 'portfolio_status_update',
    GoalStatusUpdate: 'goal_status_update'
  } as const;
  export type ResourceSubtypeEnum = typeof ResourceSubtypeEnum[keyof typeof ResourceSubtypeEnum];
  export const StatusTypeEnum = {
    OnTrack: 'on_track',
    AtRisk: 'at_risk',
    OffTrack: 'off_track',
    OnHold: 'on_hold',
    Complete: 'complete',
    Achieved: 'achieved',
    Partial: 'partial',
    Missed: 'missed',
    Dropped: 'dropped'
  } as const;
  export type StatusTypeEnum = typeof StatusTypeEnum[keyof typeof StatusTypeEnum];
}


