import { ProjectBriefResponseAllOfProject } from './project-brief-response-all-of-project';


export interface ProjectBriefResponse { 
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
   * [Opt In](/docs/inputoutput-options). The plain text of the project brief.
   */
  text?: string;
  /**
   * A url that points directly to the object within Asana.
   */
  readonly permalink_url?: string;
  project?: ProjectBriefResponseAllOfProject;
}

