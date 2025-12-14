

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalMetricBase { 
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
  readonly resource_subtype?: GoalMetricBase.ResourceSubtypeEnum;
  /**
   * *Conditional*. Only relevant for goal metrics of type `Number`. This field dictates the number of places after the decimal to round to, i.e. 0 is integer values, 1 rounds to the nearest tenth, and so on. Must be between 0 and 6, inclusive. For percentage format, this may be unintuitive, as a value of 0.25 has a precision of 0, while a value of 0.251 has a precision of 1. This is due to 0.25 being displayed as 25%.
   */
  precision?: number;
  /**
   * A supported unit of measure for the goal metric, or none.
   */
  unit?: GoalMetricBase.UnitEnum;
  /**
   * ISO 4217 currency code to format this custom field. This will be null if the `unit` is not `currency`.
   */
  currency_code?: string | null;
  /**
   * This number is the start value of a goal metric of type number.
   */
  initial_number_value?: number;
  /**
   * This number is the end value of a goal metric of type number. This number cannot equal `initial_number_value`.
   */
  target_number_value?: number;
  /**
   * This number is the current value of a goal metric of type number.
   */
  current_number_value?: number;
  /**
   * This string is the current value of a goal metric of type string.
   */
  readonly current_display_value?: string;
  /**
   * This field defines how the progress value of a goal metric is being calculated. A goal\'s progress can be provided manually by the user, calculated automatically from contributing subgoals, projects, or tasks, or managed by an integration with an external data source, such as Salesforce.
   */
  progress_source?: GoalMetricBase.ProgressSourceEnum;
  /**
   * *Conditional*. Only relevant if `metric.progress_source` is one of `subgoal_progress`, `project_task_completion`, `project_milestone_completion`, or `task_completion`. If true, we use the supporting object\'s custom weight to calculate the goal\'s progress. If false, we treat all supporting objects as equally weighted
   */
  is_custom_weight?: boolean;
}
export namespace GoalMetricBase {
  export const ResourceSubtypeEnum = {
    Number: 'number'
  } as const;
  export type ResourceSubtypeEnum = typeof ResourceSubtypeEnum[keyof typeof ResourceSubtypeEnum];
  export const UnitEnum = {
    None: 'none',
    Currency: 'currency',
    Percentage: 'percentage'
  } as const;
  export type UnitEnum = typeof UnitEnum[keyof typeof UnitEnum];
  export const ProgressSourceEnum = {
    Manual: 'manual',
    SubgoalProgress: 'subgoal_progress',
    ProjectTaskCompletion: 'project_task_completion',
    ProjectMilestoneCompletion: 'project_milestone_completion',
    TaskCompletion: 'task_completion',
    External: 'external'
  } as const;
  export type ProgressSourceEnum = typeof ProgressSourceEnum[keyof typeof ProgressSourceEnum];
}


