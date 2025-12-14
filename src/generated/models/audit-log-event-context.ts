

/**
 * The context from which this event originated.
 */
export interface AuditLogEventContext { 
  /**
   * The type of context. Can be one of `web`, `desktop`, `mobile`, `asana_support`, `asana`, `email`, or `api`.
   */
  context_type?: AuditLogEventContext.ContextTypeEnum;
  /**
   * The authentication method used in the context of an API request. Only present if the `context_type` is `api`. Can be one of `cookie`, `oauth`, `personal_access_token`, or `service_account`.
   */
  api_authentication_method?: AuditLogEventContext.ApiAuthenticationMethodEnum;
  /**
   * The IP address of the client that initiated the event, if applicable.
   */
  client_ip_address?: string;
  /**
   * The user agent of the client that initiated the event, if applicable.
   */
  user_agent?: string;
  /**
   * The name of the OAuth App that initiated the event. Only present if the `api_authentication_method` is `oauth`.
   */
  oauth_app_name?: string;
  /**
   * The name of the automation rule that initiated the event.
   */
  rule_name?: string;
  /**
   * The ID of the user who requested a change via support.
   */
  on_behalf_of_user_id?: number;
}
export namespace AuditLogEventContext {
  export const ContextTypeEnum = {
    Web: 'web',
    Desktop: 'desktop',
    Mobile: 'mobile',
    AsanaSupport: 'asana_support',
    Asana: 'asana',
    Email: 'email',
    Api: 'api'
  } as const;
  export type ContextTypeEnum = typeof ContextTypeEnum[keyof typeof ContextTypeEnum];
  export const ApiAuthenticationMethodEnum = {
    Cookie: 'cookie',
    Oauth: 'oauth',
    PersonalAccessToken: 'personal_access_token',
    ServiceAccount: 'service_account'
  } as const;
  export type ApiAuthenticationMethodEnum = typeof ApiAuthenticationMethodEnum[keyof typeof ApiAuthenticationMethodEnum];
}


