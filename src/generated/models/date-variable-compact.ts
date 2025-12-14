

export interface DateVariableCompact { 
  /**
   * Globally unique identifier of the date field in the project template. A value of `1` refers to the project start date, while `2` refers to the project due date.
   */
  readonly gid?: string;
  /**
   * The name of the date variable.
   */
  readonly name?: string;
  /**
   * The description of what the date variable is used for when instantiating a project.
   */
  readonly description?: string;
}

