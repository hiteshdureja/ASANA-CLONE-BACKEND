

/**
 * The entity that triggered the event. Will typically be a user.
 */
export interface AuditLogEventActor { 
  /**
   * The type of actor. Can be one of `user`, `asana`, `asana_support`, `anonymous`, or `external_administrator`.
   */
  actor_type?: AuditLogEventActor.ActorTypeEnum;
  /**
   * Globally unique identifier of the actor, if it is a user.
   */
  gid?: string;
  /**
   * The name of the actor, if it is a user.
   */
  name?: string;
  /**
   * The email of the actor, if it is a user.
   */
  email?: string;
}
export namespace AuditLogEventActor {
  export const ActorTypeEnum = {
    User: 'user',
    Asana: 'asana',
    AsanaSupport: 'asana_support',
    Anonymous: 'anonymous',
    ExternalAdministrator: 'external_administrator'
  } as const;
  export type ActorTypeEnum = typeof ActorTypeEnum[keyof typeof ActorTypeEnum];
}


