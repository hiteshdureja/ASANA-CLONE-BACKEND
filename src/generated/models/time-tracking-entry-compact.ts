import { TimeTrackingEntryCompactAttributableTo } from './time-tracking-entry-compact-attributable-to';
import { UserCompact } from './user-compact';


/**
 * A generic Asana Resource, containing a globally unique identifier.
 */
export interface TimeTrackingEntryCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * Time in minutes tracked by the entry.
   */
  duration_minutes?: number;
  /**
   * The day that this entry is logged on.
   */
  entered_on?: string;
  attributable_to?: TimeTrackingEntryCompactAttributableTo;
  created_by?: UserCompact;
}

