import { GoalRelationshipCompactSupportingResource } from './goal-relationship-compact-supporting-resource';


/**
 * A *goal relationship* is an object representing the relationship between a goal and another goal, a project, a task, or a portfolio.
 */
export interface GoalRelationshipCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning.
   */
  readonly resource_subtype?: GoalRelationshipCompact.ResourceSubtypeEnum;
  supporting_resource?: GoalRelationshipCompactSupportingResource;
  /**
   * The weight that the supporting resource\'s progress contributes to the supported goal\'s progress. This can be 0, 1, or any value in between.
   */
  contribution_weight?: number;
}
export namespace GoalRelationshipCompact {
  export const ResourceSubtypeEnum = {
    Subgoal: 'subgoal',
    SupportingWork: 'supporting_work'
  } as const;
  export type ResourceSubtypeEnum = typeof ResourceSubtypeEnum[keyof typeof ResourceSubtypeEnum];
}


