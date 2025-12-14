

export interface BudgetEstimateResponse { 
  /**
   * Billable status filter applied to the estimate when `source` is `tasks`. Ignored when `source` is `capacity_plans` or `none`. When not provided, defaults to `billable`.
   */
  billable_status_filter?: BudgetEstimateResponse.BillableStatusFilterEnum;
  /**
   * The data source for the estimate. `tasks`: use task-level estimated time attributed to the parent. `capacity_plans`: use capacity plan estimates attributed to the parent. `none`: disables the estimate; only valid when `enabled` is `false`. When `enabled` is `true`, `source` must not be `none`.
   */
  source?: BudgetEstimateResponse.SourceEnum;
  /**
   * Controls whether the estimate is displayed in the budget. This flag primarily affects UI presentation and the response payload. When `false` (and `source` is `none`), the estimate is hidden and the API response will return `value: null` and `units: null` for this field.
   */
  enabled?: boolean;
  /**
   * The units of the estimate value. When `budget_type` is `time`, units are `\"minutes\"`. When `budget_type` is `cost`, units are the ISO 4217 currency code configured at the domain level. When `source` is `none` and `enabled` is `false`, this field will be `null`.
   */
  readonly units?: string;
  /**
   * The aggregated estimate value for the budget. This value is computed based on the selected `source` and, when `source` is `tasks`, the specified `billable_status_filter`. When `budget_type` is `time`, represents the aggregated estimated minutes on the parent. When `budget_type` is `cost`, represents the aggregated estimated cost on the parent (estimated time x resource rate). When `source` is `none` and `enabled` is `false`, this field will be `null`.
   */
  readonly value?: number;
}
export namespace BudgetEstimateResponse {
  export const BillableStatusFilterEnum = {
    Billable: 'billable',
    NonBillable: 'non_billable',
    Any: 'any'
  } as const;
  export type BillableStatusFilterEnum = typeof BillableStatusFilterEnum[keyof typeof BillableStatusFilterEnum];
  export const SourceEnum = {
    None: 'none',
    Tasks: 'tasks',
    CapacityPlans: 'capacity_plans'
  } as const;
  export type SourceEnum = typeof SourceEnum[keyof typeof SourceEnum];
}


