import { MemberCompact } from './member-compact';
import { CustomFieldCompact } from './custom-field-compact';


/**
 * This object describes a user or team\'s membership to a custom field including their level of access (Admin, Editor, or User).
 */
export interface CustomFieldMembershipCompact { 
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
  parent?: CustomFieldCompact;
  member?: MemberCompact;
  /**
   * Whether the member has admin, editor, or user access to the custom field.
   */
  readonly access_level?: CustomFieldMembershipCompact.AccessLevelEnum;
}
export namespace CustomFieldMembershipCompact {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    User: 'user'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


