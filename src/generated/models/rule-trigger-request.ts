

export interface RuleTriggerRequest { 
  /**
   * The ID of the resource. For the duration of the beta, this resource is always a task, and this task must exist in the project in which the rule is created.
   */
  resource: string;
  /**
   * The dynamic keys and values of the request. These fields are intended to be used in the action for the rule associated with this trigger.
   */
  action_data: { [key: string]: any; };
}

