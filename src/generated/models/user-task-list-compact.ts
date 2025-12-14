import { WorkspaceCompact } from './workspace-compact';
import { UserCompact } from './user-compact';


/**
 * A user task list represents the tasks assigned to a particular user. It provides API access to a user’s [My tasks](https://asana.com/guide/help/fundamentals/my-tasks) view in Asana.
 */
export interface UserTaskListCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the user task list.
   */
  name?: string;
  /**
   * The owner of the user task list, i.e. the person whose My Tasks is represented by this resource.
   */
  readonly owner?: UserCompact;
  /**
   * The workspace in which the user task list is located.
   */
  readonly workspace?: WorkspaceCompact;
}

