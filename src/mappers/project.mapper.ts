import { Project } from '../entities/project.entity';
import { ProjectResponse, ProjectRequest, UserCompact } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class ProjectMapper {
  static toResponse(
    project: Project,
    optFields?: string[],
  ): ProjectResponse {
    // Build response object matching Asana's exact format
    const response: any = {
      gid: project.gid,
      resource_type: 'project',
      name: project.name,
      archived: project.archived ?? false,
      color: project.color || null,
      created_at: project.createdAt.toISOString(),
      notes: project.notes || undefined,
      html_notes: project.htmlNotes || undefined,
      completed: project.completed ?? false,
      completed_at: project.completedAt ? (project.completedAt instanceof Date ? project.completedAt.toISOString().split('T')[0] : project.completedAt):null,
      due_on: project.dueOn ? (project.dueOn instanceof Date ? project.dueOn.toISOString().split('T')[0] : project.dueOn) : null,
      start_on: project.startOn ? (project.startOn instanceof Date ? project.startOn.toISOString().split('T')[0] : project.startOn) : null,
      default_view: project.defaultView || undefined,
      privacy_setting: project.privacySetting || undefined,
      public: project.public ?? false,
      default_access_level: project.defaultAccessLevel || undefined,
      minimum_access_level_for_customization:
        project.minimumAccessLevelForCustomization || undefined,
      minimum_access_level_for_sharing:
        project.minimumAccessLevelForSharing || undefined,
      icon: project.icon || null,
      modified_at: project.modifiedAt.toISOString(),
      permalink_url: `https://app.asana.com/0/${project.gid}`,
    };

    // Workspace - always include resource_type
    if (project.workspace) {
      response.workspace = {
        gid: project.workspace.gid,
        resource_type: 'workspace',
        name: project.workspace.name,
      };
    }

    // Team - always include resource_type
    if (project.team) {
      response.team = {
        gid: project.team.gid,
        resource_type: 'team',
        name: project.team.name,
      };
    }

    // Owner - always include resource_type
    if (project.owner) {
      response.owner = {
        gid: project.owner.gid,
        resource_type: 'user',
        name: project.owner.name,
      };
    }

    // Completed by - always include resource_type
    if (project.completedBy) {
      response.completed_by = {
        gid: project.completedBy.gid,
        resource_type: 'user',
        name: project.completedBy.name,
      } as UserCompact;
    } else {
      response.completed_by = null;
    }

    // Members - always include resource_type
    if (project.members && project.members.length > 0) {
      response.members = project.members.map((member) => ({
        gid: member.gid,
        resource_type: 'user',
        name: member.name,
      } as UserCompact));
    } else {
      response.members = [];
    }

    // Followers - always include resource_type
    if (project.followers && project.followers.length > 0) {
      response.followers = project.followers.map((follower) => ({
        gid: follower.gid,
        resource_type: 'user',
        name: follower.name,
      } as UserCompact));
    } else {
      response.followers = [];
    }

    // Remove undefined values to match Asana's response (they don't include undefined fields)
    const cleanedResponse = Object.fromEntries(
      Object.entries(response).filter(([_, value]) => value !== undefined)
    );

    return filterFields(cleanedResponse, optFields) as ProjectResponse;
  }

  static fromRequest(request: ProjectRequest): Partial<Project> {
    const data = request as any;
    return {
      name: data.name,
      notes: data.notes,
      htmlNotes: data.html_notes,
      archived: data.archived,
      color: data.color,
      defaultView: data.default_view,
      dueOn: data.due_on ? new Date(data.due_on) : (null as any),
      startOn: data.start_on ? new Date(data.start_on) : (null as any),
      privacySetting: data.privacy_setting,
      public: data.public,
      defaultAccessLevel: data.default_access_level,
      minimumAccessLevelForCustomization:
        data.minimum_access_level_for_customization,
      minimumAccessLevelForSharing: data.minimum_access_level_for_sharing,
      icon: data.icon,
    };
  }
}

