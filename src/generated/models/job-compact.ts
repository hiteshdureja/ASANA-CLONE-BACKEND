import { ProjectTemplateCompact } from './project-template-compact';
import { ResourceExportCompact } from './resource-export-compact';
import { JobCompactNewTask } from './job-compact-new-task';
import { ProjectCompact } from './project-compact';
import { GraphExportCompact } from './graph-export-compact';


/**
 * A *job* is an object representing a process that handles asynchronous work.
 */
export interface JobCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning.
   */
  readonly resource_subtype?: string;
  /**
   * The current status of this job.
   */
  readonly status?: JobCompact.StatusEnum;
  new_project?: ProjectCompact;
  new_task?: JobCompactNewTask;
  new_project_template?: ProjectTemplateCompact;
  new_graph_export?: GraphExportCompact;
  new_resource_export?: ResourceExportCompact;
}
export namespace JobCompact {
  export const StatusEnum = {
    NotStarted: 'not_started',
    InProgress: 'in_progress',
    Succeeded: 'succeeded',
    Failed: 'failed'
  } as const;
  export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
}


