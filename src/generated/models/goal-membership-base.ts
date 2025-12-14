import { GoalMembershipBaseParent } from './goal-membership-base-parent';
import { GoalMembershipBaseGoal } from './goal-membership-base-goal';
import { MemberCompact } from './member-compact';


/**
 * This object represents a user\'s connection to a goal.
 */
export interface GoalMembershipBase { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  resource_type?: string;
  /**
   * The type of membership.
   */
  readonly resource_subtype?: string;
  member?: MemberCompact;
  parent?: GoalMembershipBaseParent;
  /**
   * *Deprecated: Describes if the member is a commenter or editor in goal.*
   * @deprecated
   */
  role?: GoalMembershipBase.RoleEnum;
  /**
   * \"Describes the membership access level for the goal. This is preferred over role.\"
   */
  access_level?: GoalMembershipBase.AccessLevelEnum;
  goal?: GoalMembershipBaseGoal;
}
export namespace GoalMembershipBase {
  export const RoleEnum = {
    Commenter: 'commenter',
    Editor: 'editor'
  } as const;
  export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];
  export const AccessLevelEnum = {
    Viewer: 'viewer',
    Commenter: 'commenter',
    Editor: 'editor',
    Admin: 'admin'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


