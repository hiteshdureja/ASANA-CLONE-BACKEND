

export interface GoalUpdateRequest { 
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
  /**
   * *Conditional*. This property is only present when the `workspace` provided is an organization.
   */
  team?: string | null;
  /**
   * The `gid` of a workspace.
   */
  workspace?: string;
  /**
   * The `gid` of a time period.
   */
  time_period?: string | null;
  /**
   * The `gid` of a user.
   */
  owner?: string | null;
  /**
   * The current status of this goal. When the goal is open, its status can be `green`, `yellow`, and `red` to reflect \"On Track\", \"At Risk\", and \"Off Track\", respectively. When the goal is closed, the value can be `missed`, `achieved`, `partial`, or `dropped`. *Note* you can only write to this property if `metric` is set.
   */
  status?: string | null;
  /**
   * An object where each key is the GID of a custom field and its corresponding value is either an enum GID, string, number, or object (depending on the custom field type). See the [custom fields guide](/docs/custom-fields-guide) for details on creating and updating custom field values.
   */
  custom_fields?: { [key: string]: string; };
}

