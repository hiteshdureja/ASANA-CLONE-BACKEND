import { AccessRequestTargetIdCompact } from './access-request-target-id-compact';
import { UserCompact } from './user-compact';


/**
 * A *access request* object represents a request to access a shareable resource within Asana. It includes the requester\'s information, approval status, and target resource details.
 */
export interface AccessRequestResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The message included in the access request, if any.
   */
  message?: string;
  /**
   * The current approval status of the request.
   */
  approval_status?: AccessRequestResponse.ApprovalStatusEnum;
  requester?: UserCompact;
  target?: AccessRequestTargetIdCompact;
}
export namespace AccessRequestResponse {
  export const ApprovalStatusEnum = {
    Pending: 'pending',
    Approved: 'approved',
    Denied: 'denied'
  } as const;
  export type ApprovalStatusEnum = typeof ApprovalStatusEnum[keyof typeof ApprovalStatusEnum];
}


