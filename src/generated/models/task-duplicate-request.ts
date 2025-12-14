

export interface TaskDuplicateRequest { 
  /**
   * The name of the new task.
   */
  name?: string;
  /**
   * A comma-separated list of fields that will be duplicated to the new task. ##### Fields - assignee - attachments - dates - dependencies - followers - notes - parent - projects - subtasks - tags
   */
  include?: string;
}

