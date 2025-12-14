

/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface GoalBase { 
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
  /**
   * The notes of the goal with formatting as HTML.
   */
  html_notes?: string;
  /**
   * Free-form textual information associated with the goal (i.e. its description).
   */
  notes?: string;
  /**
   * The localized day on which this goal is due. This takes a date with format `YYYY-MM-DD`.
   */
  due_on?: string | null;
  /**
   * The day on which work for this goal begins, or null if the goal has no start date. This takes a date with `YYYY-MM-DD` format, and cannot be set unless there is an accompanying due date.
   */
  start_on?: string | null;
  /**
   * *Conditional*. This property is only present when the `workspace` provided is an organization. Whether the goal belongs to the `workspace` (and is listed as part of the workspace’s goals) or not. If it isn’t a workspace-level goal, it is a team-level goal, and is associated with the goal’s team.
   */
  is_workspace_level?: boolean;
  /**
   * True if the goal is liked by the authorized user, false if not.
   */
  liked?: boolean;
}

