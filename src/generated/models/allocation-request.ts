import { AllocationBaseEffort } from './allocation-base-effort';


export interface AllocationRequest { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The localized day on which the allocation starts.
   */
  start_date?: string;
  /**
   * The localized day on which the allocation ends.
   */
  end_date?: string;
  effort?: AllocationBaseEffort | null;
  /**
   * Globally unique identifier for the user or placeholder assigned to the allocation.
   */
  assignee?: string;
  /**
   * Globally unique identifier for the project the allocation is on.
   */
  parent?: string;
}

