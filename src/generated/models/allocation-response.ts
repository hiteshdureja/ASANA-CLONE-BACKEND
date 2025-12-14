import { AllocationResponseAllOfAssignee } from './allocation-response-all-of-assignee';
import { AllocationBaseEffort } from './allocation-base-effort';


export interface AllocationResponse { 
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
  assignee?: AllocationResponseAllOfAssignee;
  created_by?: object;
  parent?: object;
  /**
   * The subtype of the allocation.
   */
  resource_subtype?: string;
}

