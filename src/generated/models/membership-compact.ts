import { GoalMembershipCompact } from './goal-membership-compact';
import { CustomFieldMembershipCompact } from './custom-field-membership-compact';
import { ProjectMembershipCompactResponse } from './project-membership-compact-response';
import { PortfolioMembershipCompactResponse } from './portfolio-membership-compact-response';
import { GoalMembershipBaseGoal } from './goal-membership-base-goal';
import { MemberCompact } from './member-compact';
import { CustomFieldCompact } from './custom-field-compact';


export interface MembershipCompact { 
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
  role?: MembershipCompact.RoleEnum;
  /**
   * Whether the member has admin, editor, or user access to the custom field.
   */
  readonly access_level?: MembershipCompact.AccessLevelEnum;
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
export namespace MembershipCompact {
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


