

export interface TeamRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the team.
   */
  name?: string;
  /**
   * The description of the team. 
   */
  description?: string;
  /**
   * The description of the team with formatting as HTML. 
   */
  html_description?: string;
  /**
   * The organization/workspace the team belongs to. This must be the same organization you are in and cannot be changed once set. 
   */
  organization?: string;
  /**
   * The visibility of the team to users in the same organization 
   */
  visibility?: TeamRequest.VisibilityEnum;
  /**
   * Controls who can edit team name and description 
   */
  edit_team_name_or_description_access_level?: TeamRequest.EditTeamNameOrDescriptionAccessLevelEnum;
  /**
   * Controls who can edit team visibility and trash teams 
   */
  edit_team_visibility_or_trash_team_access_level?: TeamRequest.EditTeamVisibilityOrTrashTeamAccessLevelEnum;
  /**
   * Controls who can accept or deny member invites for a given team 
   */
  member_invite_management_access_level?: TeamRequest.MemberInviteManagementAccessLevelEnum;
  /**
   * Controls who can accept or deny guest invites for a given team 
   */
  guest_invite_management_access_level?: TeamRequest.GuestInviteManagementAccessLevelEnum;
  /**
   * Controls who can accept or deny join team requests for a Membership by Request team. This field can only be updated when the team\'s `visibility` field is `request_to_join`. 
   */
  join_request_management_access_level?: TeamRequest.JoinRequestManagementAccessLevelEnum;
  /**
   * Controls who can remove team members 
   */
  team_member_removal_access_level?: TeamRequest.TeamMemberRemovalAccessLevelEnum;
  /**
   * Controls who can create and share content with the team 
   */
  team_content_management_access_level?: TeamRequest.TeamContentManagementAccessLevelEnum;
  /**
   * Whether the team has been endorsed 
   */
  endorsed?: boolean;
}
export namespace TeamRequest {
  export const VisibilityEnum = {
    Secret: 'secret',
    RequestToJoin: 'request_to_join',
    Public: 'public'
  } as const;
  export type VisibilityEnum = typeof VisibilityEnum[keyof typeof VisibilityEnum];
  export const EditTeamNameOrDescriptionAccessLevelEnum = {
    AllTeamMembers: 'all_team_members',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type EditTeamNameOrDescriptionAccessLevelEnum = typeof EditTeamNameOrDescriptionAccessLevelEnum[keyof typeof EditTeamNameOrDescriptionAccessLevelEnum];
  export const EditTeamVisibilityOrTrashTeamAccessLevelEnum = {
    AllTeamMembers: 'all_team_members',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type EditTeamVisibilityOrTrashTeamAccessLevelEnum = typeof EditTeamVisibilityOrTrashTeamAccessLevelEnum[keyof typeof EditTeamVisibilityOrTrashTeamAccessLevelEnum];
  export const MemberInviteManagementAccessLevelEnum = {
    AllTeamMembers: 'all_team_members',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type MemberInviteManagementAccessLevelEnum = typeof MemberInviteManagementAccessLevelEnum[keyof typeof MemberInviteManagementAccessLevelEnum];
  export const GuestInviteManagementAccessLevelEnum = {
    AllTeamMembers: 'all_team_members',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type GuestInviteManagementAccessLevelEnum = typeof GuestInviteManagementAccessLevelEnum[keyof typeof GuestInviteManagementAccessLevelEnum];
  export const JoinRequestManagementAccessLevelEnum = {
    AllTeamMembers: 'all_team_members',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type JoinRequestManagementAccessLevelEnum = typeof JoinRequestManagementAccessLevelEnum[keyof typeof JoinRequestManagementAccessLevelEnum];
  export const TeamMemberRemovalAccessLevelEnum = {
    AllTeamMembers: 'all_team_members',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type TeamMemberRemovalAccessLevelEnum = typeof TeamMemberRemovalAccessLevelEnum[keyof typeof TeamMemberRemovalAccessLevelEnum];
  export const TeamContentManagementAccessLevelEnum = {
    NoRestriction: 'no_restriction',
    OnlyTeamAdmins: 'only_team_admins'
  } as const;
  export type TeamContentManagementAccessLevelEnum = typeof TeamContentManagementAccessLevelEnum[keyof typeof TeamContentManagementAccessLevelEnum];
}


