import { GoalMembershipBaseParent } from './goal-membership-base-parent';
import { GoalMembershipBaseGoal } from './goal-membership-base-goal';
import { MemberCompact } from './member-compact';


export interface GoalMembershipCompact { 
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
  role?: GoalMembershipCompact.RoleEnum;
  /**
   * \"Describes the membership access level for the goal. This is preferred over role.\"
   */
  access_level?: GoalMembershipCompact.AccessLevelEnum;
  goal?: GoalMembershipBaseGoal;
  /**
   * *Deprecated: new integrations should prefer the `access_level` field.* Describes if the member is comment only in goal. This field is deprecated and will always be null.
   * @deprecated
   */
  readonly is_commenter?: boolean;
  /**
   * *Deprecated: new integrations should prefer the `access_level` field.* Describes if the member is editor in goal. This field is deprecated and will always be null.
   * @deprecated
   */
  readonly is_editor?: boolean;
}
export namespace GoalMembershipCompact {
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


