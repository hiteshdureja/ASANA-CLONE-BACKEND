import { TimeTrackingEntryCompactAttributableTo } from './time-tracking-entry-compact-attributable-to';
import { TaskCompact } from './task-compact';
import { UserCompact } from './user-compact';


export interface TimeTrackingEntryBase { 
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
  task?: TaskCompact;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * *Optional*. The current approval status of the entry.
   */
  readonly approval_status?: TimeTrackingEntryBase.ApprovalStatusEnum;
  /**
   * *Optional*. The current billable status of the entry.
   */
  readonly billable_status?: TimeTrackingEntryBase.BillableStatusEnum;
  /**
   * *Optional*. The description of the entry.
   */
  readonly description?: string;
}
export namespace TimeTrackingEntryBase {
  export const ApprovalStatusEnum = {
    Draft: 'DRAFT',
    Submitted: 'SUBMITTED',
    Approved: 'APPROVED',
    Rejected: 'REJECTED'
  } as const;
  export type ApprovalStatusEnum = typeof ApprovalStatusEnum[keyof typeof ApprovalStatusEnum];
  export const BillableStatusEnum = {
    Billable: 'billable',
    NonBillable: 'nonBillable',
    NotApplicable: 'notApplicable'
  } as const;
  export type BillableStatusEnum = typeof BillableStatusEnum[keyof typeof BillableStatusEnum];
}


