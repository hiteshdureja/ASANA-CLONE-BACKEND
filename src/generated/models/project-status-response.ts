import { UserCompact } from './user-compact';


export interface ProjectStatusResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The title of the project status update.
   */
  title?: string;
  /**
   * The text content of the status update.
   */
  text?: string;
  /**
   * [Opt In](/docs/inputoutput-options). The text content of the status update with formatting as HTML.
   */
  html_text?: string;
  /**
   * The color associated with the status update.
   */
  color?: ProjectStatusResponse.ColorEnum;
  author?: UserCompact;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  created_by?: UserCompact;
  /**
   * The time at which this project status was last modified. *Note: This does not currently reflect any changes in associations such as comments that may have been added or removed from the project status.*
   */
  readonly modified_at?: string;
}
export namespace ProjectStatusResponse {
  export const ColorEnum = {
    Green: 'green',
    Yellow: 'yellow',
    Red: 'red',
    Blue: 'blue',
    Complete: 'complete'
  } as const;
  export type ColorEnum = typeof ColorEnum[keyof typeof ColorEnum];
}


