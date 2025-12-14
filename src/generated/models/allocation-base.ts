import { AllocationBaseEffort } from './allocation-base-effort';


/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface AllocationBase { 
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
}

