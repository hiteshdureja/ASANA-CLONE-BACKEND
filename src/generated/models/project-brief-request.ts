

export interface ProjectBriefRequest { 
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
  /**
   * The plain text of the project brief. When writing to a project brief, you can specify either `html_text` (preferred) or `text`, but not both.
   */
  text?: string;
}

