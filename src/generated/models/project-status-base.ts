

export interface ProjectStatusBase { 
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
  color?: ProjectStatusBase.ColorEnum;
}
export namespace ProjectStatusBase {
  export const ColorEnum = {
    Green: 'green',
    Yellow: 'yellow',
    Red: 'red',
    Blue: 'blue',
    Complete: 'complete'
  } as const;
  export type ColorEnum = typeof ColorEnum[keyof typeof ColorEnum];
}


