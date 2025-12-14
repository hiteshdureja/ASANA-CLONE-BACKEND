import { ProjectCompact } from './project-compact';
import { MemberCompact } from './member-compact';


/**
 * This object describes a team or a user\'s membership to a project including their level of access (Admin, Editor, Commenter, or Viewer).
 */
export interface ProjectMembershipCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  parent?: ProjectCompact;
  member?: MemberCompact;
  /**
   * Whether the member has admin, editor, commenter, or viewer access to the project.
   */
  readonly access_level?: ProjectMembershipCompact.AccessLevelEnum;
}
export namespace ProjectMembershipCompact {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Commenter: 'commenter',
    Viewer: 'viewer'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


