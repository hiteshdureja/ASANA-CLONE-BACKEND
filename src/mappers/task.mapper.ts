import { generateGid } from 'src/utils/gid.util';
import { Task } from '../entities/task.entity';
import { TaskResponse, TaskRequest } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class TaskMapper {
  static toResponse(
    task: Task,
    optFields?: string[],
  ): TaskResponse {
    const response: any = {
      gid: task.gid,
      resource_type: 'task',
      name: task.name,
      resource_subtype: task.resourceSubtype as any,
      notes: task.notes,
      html_notes: task.htmlNotes,
      completed: task.completed,
      completed_at: task.completedAt?.toISOString() || null,
      due_on: task.dueOn?.toISOString().split('T')[0] || null,
      due_at: task.dueAt?.toISOString() || null,
      start_on: task.startOn?.toISOString().split('T')[0] || null,
      start_at: task.startAt?.toISOString() || null,
      approval_status: task.approvalStatus as any,
      assignee_status: task.assigneeStatus as any,
      actual_time_minutes: task.actualTimeMinutes,
      external: task.external,
      liked: task.liked,
      hearted: task.hearted,
      is_rendered_as_separator: task.isRenderedAsSeparator,
      created_at: task.createdAt.toISOString(),
      modified_at: task.modifiedAt.toISOString(),
      permalink_url: `https://app.asana.com/0/${task.gid}`,
    };

    if (task.assignee) {
      response.assignee = {
        gid: task.assignee.gid,
        name: task.assignee.name,
      };
    }

    if (task.createdBy) {
      response.created_by = {
        gid: task.createdBy.gid,
        resource_type: 'user',
      };
    }

    if (task.completedBy) {
      response.completed_by = {
        gid: task.completedBy.gid,
        name: task.completedBy.name,
      };
    }

    if (task.parent) {
      response.parent = {
        gid: task.parent.gid,
        name: task.parent.name,
        resource_subtype: task.parent.resourceSubtype as any,
        created_by: task.parent.createdBy ? {
          gid: task.parent.createdBy.gid,
          resource_type: 'user',
        } : undefined,
      };
    }

    if (task.workspace) {
      response.workspace = {
        gid: task.workspace.gid,
        name: task.workspace.name,
      };
    }

    if (task.projects) {
      response.projects = task.projects.map((project) => ({
        gid: project.gid,
        name: project.name,
      }));
    }

    if (task.tags) {
      response.tags = task.tags.map((tag) => ({
        gid: tag.gid,
        name: tag.name,
      }));
    }

    if (task.followers) {
      response.followers = task.followers.map((follower) => ({
        gid: follower.gid,
        name: follower.name,
      }));
    }

    if (task.dependencies) {
      response.dependencies = task.dependencies.map((dep) => ({
        gid: dep.gid,
        resource_type: 'task',
      }));
    }

    if (task.dependents) {
      response.dependents = task.dependents.map((dep) => ({
        gid: dep.gid,
        resource_type: 'task',
      }));
    }

    if (task.subtasks) {
      response.num_subtasks = task.subtasks.length;
    }

    return filterFields(response, optFields) as TaskResponse;
  }

  static fromRequest(request: TaskRequest): Partial<Task> {
    return {
      name: request.name,
      notes: request.notes,
      htmlNotes: request.html_notes,
      completed: request.completed,
      dueOn: request.due_on ? new Date(request.due_on) : (null as any),
      dueAt: request.due_at ? new Date(request.due_at) : (null as any),
      startOn: request.start_on ? new Date(request.start_on) : (null as any),
      startAt: request.start_at ? new Date(request.start_at) : (null as any),
      resourceSubtype: request.resource_subtype,
      approvalStatus: request.approval_status,
      assigneeStatus: request.assignee_status,
      actualTimeMinutes: request.actual_time_minutes || (null as any),
      external: request.external,
    };
  }
}

