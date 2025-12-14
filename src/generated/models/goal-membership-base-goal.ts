import { GoalCompactOwner } from './goal-compact-owner';


export interface GoalMembershipBaseGoal { 
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

