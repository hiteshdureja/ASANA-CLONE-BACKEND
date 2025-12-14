

export interface PortfolioRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the portfolio.
   */
  name?: string;
  /**
   * [Opt In](/docs/inputoutput-options). True if the portfolio is archived, false if not. Archived portfolios do not show in the UI by default and may be treated differently for queries.
   */
  archived?: boolean;
  /**
   * Color of the portfolio.
   */
  color?: PortfolioRequest.ColorEnum;
  /**
   * The day on which work for this portfolio begins, or null if the portfolio has no start date. This takes a date with `YYYY-MM-DD` format. *Note: `due_on` must be present in the request when setting or unsetting the `start_on` parameter. Additionally, `start_on` and `due_on` cannot be the same date.*
   */
  start_on?: string | null;
  /**
   * The day on which this portfolio is due. This takes a date with format YYYY-MM-DD.
   */
  due_on?: string | null;
  /**
   * The default access level when inviting new members to the portfolio
   */
  default_access_level?: PortfolioRequest.DefaultAccessLevelEnum;
  /**
   * *Create-only*. The workspace or organization that the portfolio belongs to.
   */
  workspace?: string;
  /**
   * *Deprecated:* new integrations use `privacy_setting` instead.
   * @deprecated
   */
  'public'?: boolean;
}
export namespace PortfolioRequest {
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
  export const DefaultAccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Viewer: 'viewer'
  } as const;
  export type DefaultAccessLevelEnum = typeof DefaultAccessLevelEnum[keyof typeof DefaultAccessLevelEnum];
}


