import { WorkspaceCompact } from './workspace-compact';
import { UserCompact } from './user-compact';


export interface TagResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Name of the tag. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer.
   */
  name?: string;
  /**
   * Color of the tag.
   */
  color?: TagResponse.ColorEnum | null;
  /**
   * Free-form textual information associated with the tag (i.e. its description).
   */
  notes?: string;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * Array of users following this tag.
   */
  readonly followers?: Array<UserCompact>;
  workspace?: WorkspaceCompact;
  /**
   * A url that points directly to the object within Asana.
   */
  readonly permalink_url?: string;
}
export namespace TagResponse {
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


