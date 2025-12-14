

export interface TaskTemplateRecipeCompact { 
  /**
   * Name of the task that will be created from this template.
   */
  name?: string;
  /**
   * The subtype of the task that will be created from this template.
   */
  task_resource_subtype?: TaskTemplateRecipeCompact.TaskResourceSubtypeEnum;
}
export namespace TaskTemplateRecipeCompact {
  export const TaskResourceSubtypeEnum = {
    DefaultTask: 'default_task',
    MilestoneTask: 'milestone_task',
    ApprovalTask: 'approval_task'
  } as const;
  export type TaskResourceSubtypeEnum = typeof TaskResourceSubtypeEnum[keyof typeof TaskResourceSubtypeEnum];
}


