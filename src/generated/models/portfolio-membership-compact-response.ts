import { PortfolioCompact } from './portfolio-compact';
import { MemberCompact } from './member-compact';


export interface PortfolioMembershipCompactResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  resource_type?: string;
  parent?: PortfolioCompact;
  member?: MemberCompact;
  /**
   * Whether the member has admin, editor, or viewer access to the portfolio. Portfolios do not support commenter access yet.
   */
  readonly access_level?: PortfolioMembershipCompactResponse.AccessLevelEnum;
  /**
   * Type of the membership.
   */
  resource_subtype?: string;
}
export namespace PortfolioMembershipCompactResponse {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Viewer: 'viewer'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


