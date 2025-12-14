import { GoalResponseAllOfOwner } from './goal-response-all-of-owner';
import { CustomFieldSettingResponse } from './custom-field-setting-response';
import { Like } from './like';
import { GoalResponseAllOfWorkspace } from './goal-response-all-of-workspace';
import { GoalResponseAllOfTimePeriod } from './goal-response-all-of-time-period';
import { StatusUpdateCompact } from './status-update-compact';
import { UserCompact } from './user-compact';
import { GoalResponseAllOfTeam } from './goal-response-all-of-team';
import { CustomFieldCompact } from './custom-field-compact';
import { GoalResponseAllOfMetric } from './goal-response-all-of-metric';


export interface GoalResponse { 
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
   * Array of likes for users who have liked this goal.
   */
  readonly likes?: Array<Like>;
  /**
   * The number of users who have liked this goal.
   */
  readonly num_likes?: number;
  team?: GoalResponseAllOfTeam;
  workspace?: GoalResponseAllOfWorkspace;
  /**
   * Array of users who are members of this goal.
   */
  followers?: Array<UserCompact>;
  time_period?: GoalResponseAllOfTimePeriod;
  metric?: GoalResponseAllOfMetric;
  owner?: GoalResponseAllOfOwner;
  /**
   * The latest `status_update` posted to this goal.
   */
  current_status_update?: StatusUpdateCompact | null;
  /**
   * The current status of this goal. When the goal is open, its status can be `green`, `yellow`, and `red` to reflect \"On Track\", \"At Risk\", and \"Off Track\", respectively. When the goal is closed, the value can be `missed`, `achieved`, `partial`, or `dropped`. *Note* you can only write to this property if `metric` is set.
   */
  readonly status?: string | null;
  /**
   * Array of Custom Fields.
   */
  custom_fields?: Array<CustomFieldCompact>;
  /**
   * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>custom_fields:read</code></p>  Array of Custom Field Settings applied to the goal.
   */
  custom_field_settings?: Array<CustomFieldSettingResponse>;
}

