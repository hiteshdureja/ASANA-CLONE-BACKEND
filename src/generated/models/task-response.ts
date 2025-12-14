import { TagCompact } from './tag-compact';
import { TaskCompactCreatedBy } from './task-compact-created-by';
import { UserCompact } from './user-compact';
import { AsanaResource } from './asana-resource';
import { TaskResponseAllOfAssigneeSection } from './task-response-all-of-assignee-section';
import { CustomTypeStatusOptionCompact } from './custom-type-status-option-compact';
import { CustomTypeCompact } from './custom-type-compact';
import { Like } from './like';
import { ProjectCompact } from './project-compact';
import { TaskResponseAllOfWorkspace } from './task-response-all-of-workspace';
import { TaskBaseAllOfExternal } from './task-base-all-of-external';
import { TaskResponseAllOfParent } from './task-response-all-of-parent';
import { CustomFieldResponse } from './custom-field-response';
import { TaskBaseAllOfMemberships } from './task-base-all-of-memberships';


export interface TaskResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Name of the task. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer.
   */
  name?: string;
  /**
   * The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning. The resource_subtype `milestone` represent a single moment in time. This means tasks with this subtype cannot have a start_date.
   */
  resource_subtype?: TaskResponse.ResourceSubtypeEnum;
  created_by?: TaskCompactCreatedBy;
  /**
   * *Conditional* Reflects the approval status of this task. This field is kept in sync with `completed`, meaning `pending` translates to false while `approved`, `rejected`, and `changes_requested` translate to true. If you set completed to true, this field will be set to `approved`.
   */
  approval_status?: TaskResponse.ApprovalStatusEnum;
  /**
   * *Deprecated* Scheduling status of this task for the user it is assigned to. This field can only be set if the assignee is non-null. Setting this field to \"inbox\" or \"upcoming\" inserts it at the top of the section, while the other options will insert at the bottom.
   */
  assignee_status?: TaskResponse.AssigneeStatusEnum;
  /**
   * True if the task is currently marked complete, false if not.
   */
  completed?: boolean;
  /**
   * The time at which this task was completed, or null if the task is incomplete.
   */
  readonly completed_at?: string | null;
  readonly completed_by?: UserCompact | null;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * [Opt In](/docs/inputoutput-options). Array of resources referencing tasks that this task depends on. The objects contain only the gid of the dependency.
   */
  readonly dependencies?: Array<AsanaResource>;
  /**
   * [Opt In](/docs/inputoutput-options). Array of resources referencing tasks that depend on this task. The objects contain only the ID of the dependent.
   */
  readonly dependents?: Array<AsanaResource>;
  /**
   * The UTC date and time on which this task is due, or null if the task has no due time. This takes an ISO 8601 date string in UTC and should not be used together with `due_on`.
   */
  due_at?: string | null;
  /**
   * The localized date on which this task is due, or null if the task has no due date. This takes a date with `YYYY-MM-DD` format and should not be used together with `due_at`.
   */
  due_on?: string | null;
  external?: TaskBaseAllOfExternal;
  /**
   * [Opt In](/docs/inputoutput-options). The notes of the text with formatting as HTML.
   */
  html_notes?: string;
  /**
   * *Deprecated - please use liked instead* True if the task is hearted by the authorized user, false if not.
   */
  readonly hearted?: boolean;
  /**
   * *Deprecated - please use likes instead* Array of likes for users who have hearted this task.
   */
  readonly hearts?: Array<Like>;
  /**
   * [Opt In](/docs/inputoutput-options). In some contexts tasks can be rendered as a visual separator; for instance, subtasks can appear similar to [sections](/reference/sections) without being true `section` objects. If a `task` object is rendered this way in any context it will have the property `is_rendered_as_separator` set to `true`. This parameter only applies to regular tasks with `resource_subtype` of `default_task`. Tasks with `resource_subtype` of `milestone`, `approval`, or custom task types will not have this property and cannot be rendered as separators.
   */
  readonly is_rendered_as_separator?: boolean;
  /**
   * True if the task is liked by the authorized user, false if not.
   */
  liked?: boolean;
  /**
   * Array of likes for users who have liked this task.
   */
  readonly likes?: Array<Like>;
  /**
   * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>projects:read</code>, <code>project_sections:read</code></p>  *Create-only*. Array of projects this task is associated with and the section it is in. At task creation time, this array can be used to add the task to specific sections. After task creation, these associations can be modified using the `addProject` and `removeProject` endpoints. Note that over time, more types of memberships may be added to this property.
   */
  readonly memberships?: Array<TaskBaseAllOfMemberships>;
  /**
   * The time at which this task was last modified.  The following conditions will change `modified_at`:  - story is created on a task - story is trashed on a task - attachment is trashed on a task - task is assigned or unassigned - custom field value is changed - the task itself is trashed - Or if any of the following fields are updated:   - completed   - name   - due_date   - description   - attachments   - items   - schedule_status  The following conditions will _not_ change `modified_at`:  - moving to a new container (project, portfolio, etc) - comments being added to the task (but the stories they generate   _will_ affect `modified_at`)
   */
  readonly modified_at?: string;
  /**
   * Free-form textual information associated with the task (i.e. its description).
   */
  notes?: string;
  /**
   * *Deprecated - please use likes instead* The number of users who have hearted this task.
   */
  readonly num_hearts?: number;
  /**
   * The number of users who have liked this task.
   */
  readonly num_likes?: number;
  /**
   * [Opt In](/docs/inputoutput-options). The number of subtasks on this task. 
   */
  readonly num_subtasks?: number;
  /**
   * Date and time on which work begins for the task, or null if the task has no start time. This takes an ISO 8601 date string in UTC and should not be used together with `start_on`. *Note: `due_at` must be present in the request when setting or unsetting the `start_at` parameter.*
   */
  start_at?: string | null;
  /**
   * The day on which work begins for the task , or null if the task has no start date. This takes a date with `YYYY-MM-DD` format and should not be used together with `start_at`. *Note: `due_on` or `due_at` must be present in the request when setting or unsetting the `start_on` parameter.*
   */
  start_on?: string | null;
  /**
   * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>time_tracking_entries:read</code></p>  This value represents the sum of all the Time Tracking entries in the Actual Time field on a given Task. It is represented as a nullable long value.
   */
  readonly actual_time_minutes?: number | null;
  assignee?: UserCompact | null;
  assignee_section?: TaskResponseAllOfAssigneeSection;
  /**
   * Array of custom field values applied to the task. These represent the custom field values recorded on this project for a particular custom field. For example, these custom field values will contain an `enum_value` property for custom fields of type `enum`, a `text_value` property for custom fields of type `text`, and so on. Please note that the `gid` returned on each custom field value *is identical* to the `gid` of the custom field, which allows referencing the custom field metadata through the `/custom_fields/custom_field_gid` endpoint.
   */
  readonly custom_fields?: Array<CustomFieldResponse>;
  custom_type?: CustomTypeCompact | null;
  custom_type_status_option?: CustomTypeStatusOptionCompact | null;
  /**
   * Array of users following this task.
   */
  readonly followers?: Array<UserCompact>;
  parent?: TaskResponseAllOfParent;
  /**
   * *Create-only.* Array of projects this task is associated with. At task creation time, this array can be used to add the task to many projects at once. After task creation, these associations can be modified using the addProject and removeProject endpoints.
   */
  readonly projects?: Array<ProjectCompact>;
  /**
   * Array of tags associated with this task. In order to change tags on an existing task use `addTag` and `removeTag`.
   */
  readonly tags?: Array<TagCompact>;
  workspace?: TaskResponseAllOfWorkspace;
  /**
   * A url that points directly to the object within Asana.
   */
  readonly permalink_url?: string;
}
export namespace TaskResponse {
  export const ResourceSubtypeEnum = {
    DefaultTask: 'default_task',
    Milestone: 'milestone',
    Approval: 'approval'
  } as const;
  export type ResourceSubtypeEnum = typeof ResourceSubtypeEnum[keyof typeof ResourceSubtypeEnum];
  export const ApprovalStatusEnum = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected',
    ChangesRequested: 'changes_requested'
  } as const;
  export type ApprovalStatusEnum = typeof ApprovalStatusEnum[keyof typeof ApprovalStatusEnum];
  export const AssigneeStatusEnum = {
    Today: 'today',
    Upcoming: 'upcoming',
    Later: 'later',
    New: 'new',
    Inbox: 'inbox'
  } as const;
  export type AssigneeStatusEnum = typeof AssigneeStatusEnum[keyof typeof AssigneeStatusEnum];
}


