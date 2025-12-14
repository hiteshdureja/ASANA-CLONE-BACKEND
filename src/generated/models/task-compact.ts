import { TaskCompactCreatedBy } from './task-compact-created-by';


/**
 * The *task* is the basic object around which many operations in Asana are centered.
 */
export interface TaskCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the task.
   */
  name?: string;
  /**
   * The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. The resource_subtype `milestone` represent a single moment in time. This means tasks with this subtype cannot have a start_date.
   */
  resource_subtype?: TaskCompact.ResourceSubtypeEnum;
  created_by?: TaskCompactCreatedBy;
}
export namespace TaskCompact {
  export const ResourceSubtypeEnum = {
    DefaultTask: 'default_task',
    Milestone: 'milestone',
    Approval: 'approval'
  } as const;
  export type ResourceSubtypeEnum = typeof ResourceSubtypeEnum[keyof typeof ResourceSubtypeEnum];
}


