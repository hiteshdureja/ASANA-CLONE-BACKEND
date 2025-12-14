import { UserTaskListCompact } from './user-task-list-compact';
import { WorkspaceCompact } from './workspace-compact';
import { UserCompact } from './user-compact';
import { WorkspaceMembershipResponseAllOfVacationDates } from './workspace-membership-response-all-of-vacation-dates';


export interface WorkspaceMembershipResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  user?: UserCompact;
  workspace?: WorkspaceCompact;
  user_task_list?: UserTaskListCompact;
  /**
   * Indicates whether the user is currently associated with the workspace. Returns `true` for users who have joined the workspace or have been invited but not yet accepted.
   */
  readonly is_active?: boolean;
  /**
   * Reflects if this user is an admin of the workspace.
   */
  readonly is_admin?: boolean;
  /**
   * Reflects if this user is a guest of the workspace.
   */
  readonly is_guest?: boolean;
  /**
   * Reflects if this user has view only license in the workspace.
   */
  readonly is_view_only?: boolean;
  vacation_dates?: WorkspaceMembershipResponseAllOfVacationDates | null;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
}

