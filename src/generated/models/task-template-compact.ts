

/**
 * A *task template* is an object that allows new tasks to be created with a predefined setup.
 */
export interface TaskTemplateCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Name of the task template.
   */
  name?: string;
}

