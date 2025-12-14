import { ProjectCompact } from './project-compact';
import { UserCompact } from './user-compact';
import { MemberCompact } from './member-compact';


export interface ProjectMembershipNormalResponse { 
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
  readonly access_level?: ProjectMembershipNormalResponse.AccessLevelEnum;
  user?: UserCompact;
  project?: ProjectCompact;
  /**
   * Whether the member has full access or comment-only access to the project.
   */
  readonly write_access?: ProjectMembershipNormalResponse.WriteAccessEnum;
}
export namespace ProjectMembershipNormalResponse {
  export const AccessLevelEnum = {
    Admin: 'admin',
    Editor: 'editor',
    Commenter: 'commenter',
    Viewer: 'viewer'
  } as const;
  export type AccessLevelEnum = typeof AccessLevelEnum[keyof typeof AccessLevelEnum];
  export const WriteAccessEnum = {
    FullWrite: 'full_write',
    CommentOnly: 'comment_only'
  } as const;
  export type WriteAccessEnum = typeof WriteAccessEnum[keyof typeof WriteAccessEnum];
}


