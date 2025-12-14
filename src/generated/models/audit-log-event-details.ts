

/**
 * Event specific details. The schema will vary depending on the `event_type`.
 */
export interface AuditLogEventDetails { 
  [key: string]: any | any;


  /**
   * The previous value of the field that was modified in the audited event.
   */
  old_value?: string | null;
  /**
   * The new value after the modification in the audited event.
   */
  new_value?: string | null;
  /**
   * The division or organizational unit where the event occurred. Primarily used to scope role change events (e.g., `user_division_admin_role_changed`), but may appear in other contexts involving group-level changes.
   */
  group?: { [key: string]: any; };
  /**
   * The response received from the IdP when a user logs in with SAML SSO. Present on `user_login_failed` and `user_login_succeeded` events.
   */
  saml_response?: string | null;
}

