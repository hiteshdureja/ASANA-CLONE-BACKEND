import { AuditLogEventActor } from './audit-log-event-actor';
import { AuditLogEventDetails } from './audit-log-event-details';
import { AuditLogEventResource } from './audit-log-event-resource';
import { AuditLogEventContext } from './audit-log-event-context';


/**
 * An object representing a single event within an Asana domain.  Every audit log event is comprised of an `event_type`, `actor`, `resource`, and `context`. Some events will include additional metadata about the event under `details`. See our [currently supported list of events](/docs/audit-log-events#supported-audit-log-events) for more details.
 */
export interface AuditLogEvent { 
  /**
   * Globally unique identifier of the `AuditLogEvent`, as a string.
   */
  gid?: string;
  /**
   * The time the event was created.
   */
  created_at?: string;
  /**
   * The type of the event.
   */
  event_type?: string;
  /**
   * The category that this `event_type` belongs to.
   */
  event_category?: string;
  actor?: AuditLogEventActor;
  resource?: AuditLogEventResource;
  details?: AuditLogEventDetails;
  context?: AuditLogEventContext;
}

