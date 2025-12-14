import { StatusUpdateResponseAllOfParent } from './status-update-response-all-of-parent';
import { Like } from './like';
import { ReactionSummaryItemCompact } from './reaction-summary-item-compact';
import { UserCompact } from './user-compact';


export interface StatusUpdateResponse { 
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
  readonly resource_subtype?: StatusUpdateResponse.ResourceSubtypeEnum;
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
  status_type: StatusUpdateResponse.StatusTypeEnum;
  author?: UserCompact;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  created_by?: UserCompact;
  /**
   * *Deprecated - please use liked instead* True if the status is hearted by the authorized user, false if not.
   */
  readonly hearted?: boolean;
  /**
   * *Deprecated - please use likes instead* Array of likes for users who have hearted this status.
   */
  readonly hearts?: Array<Like>;
  /**
   * True if the status is liked by the authorized user, false if not.
   */
  liked?: boolean;
  /**
   * Array of likes for users who have liked this status.
   */
  readonly likes?: Array<Like>;
  /**
   * Summary of emoji reactions on this status.
   */
  readonly reaction_summary?: Array<ReactionSummaryItemCompact>;
  /**
   * The time at which this project status was last modified. *Note: This does not currently reflect any changes in associations such as comments that may have been added or removed from the status.*
   */
  readonly modified_at?: string;
  /**
   * *Deprecated - please use likes instead* The number of users who have hearted this status.
   */
  readonly num_hearts?: number;
  /**
   * The number of users who have liked this status.
   */
  readonly num_likes?: number;
  parent?: StatusUpdateResponseAllOfParent;
}
export namespace StatusUpdateResponse {
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


