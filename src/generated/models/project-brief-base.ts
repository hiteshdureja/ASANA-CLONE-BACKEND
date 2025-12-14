

export interface ProjectBriefBase { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The title of the project brief.
   */
  title?: string;
  /**
   * HTML formatted text for the project brief.
   */
  html_text?: string;
}

