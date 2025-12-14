import { PortfolioCompact } from './portfolio-compact';
import { MemberCompact } from './member-compact';


/**
 * This object determines if a user is a member of a portfolio.
 */
export interface PortfolioMembershipCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  parent?: PortfolioCompact;
  member?: MemberCompact;
  /**
   * Whether the member has admin, editor, or viewer access to the portfolio. Portfolios do not support commenter access yet.
   */
  readonly access_level?: PortfolioMembershipCompact.AccessLevelEnum;
}
export namespace PortfolioMembershipCompact {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Viewer: 'viewer'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


