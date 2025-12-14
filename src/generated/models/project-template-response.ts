import { TeamCompact } from './team-compact';
import { DateVariableCompact } from './date-variable-compact';
import { ProjectTemplateBaseAllOfOwner } from './project-template-base-all-of-owner';
import { TemplateRole } from './template-role';


export interface ProjectTemplateResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Name of the project template.
   */
  name?: string;
  /**
   * Free-form textual information associated with the project template
   */
  description?: string;
  /**
   * The description of the project template with formatting as HTML.
   */
  html_description?: string;
  /**
   * True if the project template is public to its team.
   */
  'public'?: boolean;
  owner?: ProjectTemplateBaseAllOfOwner;
  team?: TeamCompact;
  /**
   * Array of date variables in this project template. Calendar dates must be provided for these variables when instantiating a project.
   */
  readonly requested_dates?: Array<DateVariableCompact>;
  /**
   * Color of the project template.
   */
  color?: ProjectTemplateResponse.ColorEnum | null;
  /**
   * Array of template roles in this project template. User Ids can be provided for these variables when instantiating a project to assign template tasks to the user.
   */
  requested_roles?: Array<TemplateRole>;
}
export namespace ProjectTemplateResponse {
  export const ColorEnum = {
    DarkPink: 'dark-pink',
    DarkGreen: 'dark-green',
    DarkBlue: 'dark-blue',
    DarkRed: 'dark-red',
    DarkTeal: 'dark-teal',
    DarkBrown: 'dark-brown',
    DarkOrange: 'dark-orange',
    DarkPurple: 'dark-purple',
    DarkWarmGray: 'dark-warm-gray',
    LightPink: 'light-pink',
    LightGreen: 'light-green',
    LightBlue: 'light-blue',
    LightRed: 'light-red',
    LightTeal: 'light-teal',
    LightBrown: 'light-brown',
    LightOrange: 'light-orange',
    LightPurple: 'light-purple',
    LightWarmGray: 'light-warm-gray'
  } as const;
  export type ColorEnum = typeof ColorEnum[keyof typeof ColorEnum];
}


