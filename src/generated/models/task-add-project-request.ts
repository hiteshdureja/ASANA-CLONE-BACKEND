

export interface TaskAddProjectRequest { 
  /**
   * The project to add the task to.
   */
  project: string;
  /**
   * A task in the project to insert the task after, or `null` to insert at the beginning of the list.
   */
  insert_after?: string | null;
  /**
   * A task in the project to insert the task before, or `null` to insert at the end of the list.
   */
  insert_before?: string | null;
  /**
   * A section in the project to insert the task into. The task will be inserted at the bottom of the section.
   */
  section?: string | null;
}

