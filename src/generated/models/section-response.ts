import { ProjectCompact } from './project-compact';


export interface SectionResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the section (i.e. the text displayed as the section header).
   */
  name?: string;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  project?: ProjectCompact;
  /**
   * *Deprecated - please use project instead*
   */
  readonly projects?: Array<ProjectCompact>;
}

