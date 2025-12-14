import { PortfolioCompact } from './portfolio-compact';
import { UserCompact } from './user-compact';


/**
 * This object determines if a user is a member of a portfolio.
 */
export interface DeprecatedPortfolioMembershipCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  portfolio?: PortfolioCompact;
  user?: UserCompact;
  /**
   * Whether the member has admin, editor, or viewer access to the portfolio. Portfolios do not support commenter access yet.
   */
  readonly access_level?: DeprecatedPortfolioMembershipCompact.AccessLevelEnum;
}
export namespace DeprecatedPortfolioMembershipCompact {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Viewer: 'viewer'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


