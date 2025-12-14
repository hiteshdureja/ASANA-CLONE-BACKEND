import { TaskTemplateRecipeCompact } from './task-template-recipe-compact';
import { ProjectCompact } from './project-compact';
import { UserCompact } from './user-compact';
import { AttachmentCompact } from './attachment-compact';
import { CustomFieldCompact } from './custom-field-compact';


export interface TaskTemplateRecipe { 
  /**
   * Name of the task that will be created from this template.
   */
  name?: string;
  /**
   * The subtype of the task that will be created from this template.
   */
  task_resource_subtype?: TaskTemplateRecipe.TaskResourceSubtypeEnum;
  /**
   * Description of the task that will be created from this template.
   */
  description?: string;
  /**
   * HTML description of the task that will be created from this template.
   */
  html_description?: string;
  /**
   * Array of projects that the task created from this template will be added to
   */
  memberships?: Array<ProjectCompact>;
  /**
   * The number of days after the task has been instantiated on which that the task will start
   */
  relative_start_on?: number | null;
  /**
   * The number of days after the task has been instantiated on which that the task will be due
   */
  relative_due_on?: number | null;
  /**
   * The time of day that the task will be due
   */
  due_time?: string | null;
  /**
   * Array of task templates that the task created from this template will depend on
   */
  dependencies?: Array<TaskTemplateRecipeCompact>;
  /**
   * Array of task templates that will depend on the task created from this template
   */
  dependents?: Array<TaskTemplateRecipeCompact>;
  /**
   * Array of users that will be added as followers to the task created from this template
   */
  followers?: Array<UserCompact>;
  /**
   * Array of attachments that will be added to the task created from this template
   */
  attachments?: Array<AttachmentCompact>;
  /**
   * Array of subtasks that will be added to the task created from this template
   */
  subtasks?: Array<TaskTemplateRecipeCompact>;
  /**
   * Array of custom fields that will be added to the task created from this template
   */
  custom_fields?: Array<CustomFieldCompact>;
}
export namespace TaskTemplateRecipe {
  export const TaskResourceSubtypeEnum = {
    DefaultTask: 'default_task',
    MilestoneTask: 'milestone_task',
    ApprovalTask: 'approval_task'
  } as const;
  export type TaskResourceSubtypeEnum = typeof TaskResourceSubtypeEnum[keyof typeof TaskResourceSubtypeEnum];
}


