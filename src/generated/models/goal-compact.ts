import { GoalCompactOwner } from './goal-compact-owner';


/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the goal.
   */
  name?: string;
  owner?: GoalCompactOwner;
}

