

export interface BudgetActualResponse { 
  /**
   * Billable status filter applied to time tracking entries contributing to the actual value. Determines which entries are included in aggregation. When not provided, defaults to `billable`.
   */
  billable_status_filter?: BudgetActualResponse.BillableStatusFilterEnum;
  /**
   * The aggregated actual value for the budget. * When `budget_type` is `time`, represents the total actual minutes from time tracking entries. * When `budget_type` is `cost`, represents the total actual cost, computed as (actual time × resource rate).
   */
  readonly value?: number;
  /**
   * The units of the actual value. * When `budget_type` is `time`, units are `\"minutes\"`. * When `budget_type` is `cost`, units are the ISO 4217 currency code configured at the domain level.
   */
  readonly units?: string;
}
export namespace BudgetActualResponse {
  export const BillableStatusFilterEnum = {
    Billable: 'billable',
    NonBillable: 'non_billable',
    Any: 'any'
  } as const;
  export type BillableStatusFilterEnum = typeof BillableStatusFilterEnum[keyof typeof BillableStatusFilterEnum];
}


