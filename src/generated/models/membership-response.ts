import { PortfolioMembershipCompact } from './portfolio-membership-compact';
import { CustomFieldMembershipCompact } from './custom-field-membership-compact';
import { ProjectMembershipCompactResponse } from './project-membership-compact-response';
import { GoalMembershipResponse } from './goal-membership-response';
import { GoalMembershipBaseGoal } from './goal-membership-base-goal';
import { GoalMembershipResponseAllOfUser } from './goal-membership-response-all-of-user';
import { MemberCompact } from './member-compact';
import { CustomFieldCompact } from './custom-field-compact';
import { GoalMembershipResponseAllOfWorkspace } from './goal-membership-response-all-of-workspace';


export interface MembershipResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Type of the membership.
   */
  resource_subtype?: string;
  member?: MemberCompact;
  parent?: CustomFieldCompact;
  /**
   * *Deprecated: Describes if the member is a commenter or editor in goal.*
   * @deprecated
   */
  role?: MembershipResponse.RoleEnum;
  /**
   * Whether the member has admin, editor, or user access to the custom field.
   */
  readonly access_level?: MembershipResponse.AccessLevelEnum;
  goal?: GoalMembershipBaseGoal;
  user?: GoalMembershipResponseAllOfUser;
  workspace?: GoalMembershipResponseAllOfWorkspace;
}
export namespace MembershipResponse {
  export const RoleEnum = {
    Commenter: 'commenter',
    Editor: 'editor'
  } as const;
  export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    User: 'user'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


