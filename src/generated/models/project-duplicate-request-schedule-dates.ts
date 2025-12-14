

/**
 * A dictionary of options to auto-shift dates. `task_dates` must be included to use this option. Requires `should_skip_weekends` and either `start_on` or `due_on`, but not both.
 */
export interface ProjectDuplicateRequestScheduleDates { 
  /**
   * **Required**: Determines if the auto-shifted dates should skip weekends.
   */
  should_skip_weekends?: boolean;
  /**
   * Sets the last due date in the duplicated project to the given date. The rest of the due dates will be offset by the same amount as the due dates in the original project.
   */
  due_on?: string;
  /**
   * Sets the first start date in the duplicated project to the given date. The rest of the start dates will be offset by the same amount as the start dates in the original project.
   */
  start_on?: string;
}

