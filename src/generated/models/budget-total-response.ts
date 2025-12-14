

export interface BudgetTotalResponse { 
  /**
   * Indicates whether the total value is active and should be displayed in the budget. This flag primarily affects UI presentation and the response payload.
   */
  enabled?: boolean;
  /**
   * The user-set value for the total budget. When `budget_type` is `time`, represents minutes. When `budget_type` is `cost`, represents the monetary amount in the domain\'s currency. This value is stored separately for each `budget_type`, so switching between types preserves each value.
   */
  value?: number;
  /**
   * The units of the total value. When `budget_type` is `time`, units are `\"minutes\"`. When `budget_type` is `cost`, units are the ISO 4217 currency code configured at the domain level. When `enabled` is `false`, this field will be `null`.
   */
  readonly units?: string;
}

