import { ProjectCompact } from './project-compact';
import { MemberCompact } from './member-compact';


export interface ProjectMembershipCompactResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  resource_type?: string;
  parent?: ProjectCompact;
  member?: MemberCompact;
  /**
   * Whether the member has admin, editor, commenter, or viewer access to the project.
   */
  readonly access_level?: ProjectMembershipCompactResponse.AccessLevelEnum;
  /**
   * Type of the membership.
   */
  resource_subtype?: string;
}
export namespace ProjectMembershipCompactResponse {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Commenter: 'commenter',
    Viewer: 'viewer'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
}


