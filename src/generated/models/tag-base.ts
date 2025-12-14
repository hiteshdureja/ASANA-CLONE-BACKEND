

export interface TagBase { 
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
  color?: TagBase.ColorEnum | null;
  /**
   * Free-form textual information associated with the tag (i.e. its description).
   */
  notes?: string;
}
export namespace TagBase {
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


