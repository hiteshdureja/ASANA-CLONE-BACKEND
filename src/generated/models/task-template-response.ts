import { ProjectCompact } from './project-compact';
import { UserCompact } from './user-compact';
import { TaskTemplateRecipe } from './task-template-recipe';


export interface TaskTemplateResponse { 
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
  /**
   * The project that this task template belongs to.
   */
  project?: ProjectCompact | null;
  /**
   * The configuration for the task that will be created from this template.
   */
  template?: TaskTemplateRecipe;
  /**
   * The user who created this task template.
   */
  created_by?: UserCompact;
  /**
   * The time at which this task template was created.
   */
  created_at?: string;
}

