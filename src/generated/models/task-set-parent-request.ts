

export interface TaskSetParentRequest { 
  /**
   * The new parent of the task, or `null` for no parent.
   */
  parent: string;
  /**
   * A subtask of the parent to insert the task after, or `null` to insert at the beginning of the list.
   */
  insert_after?: string;
  /**
   * A subtask of the parent to insert the task before, or `null` to insert at the end of the list.
   */
  insert_before?: string;
}

