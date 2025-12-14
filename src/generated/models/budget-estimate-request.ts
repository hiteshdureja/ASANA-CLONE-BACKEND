

/**
 * Defines how the estimate portion of a budget is configured. This object controls whether the estimate is enabled, what data source it uses, and which tasks (by billable status) are included in calculating the estimate value. When disabled (enabled: false and source: none), the estimate is hidden and the API response will return `value: null` and `units: null` for this field.
 */
export interface BudgetEstimateRequest { 
  /**
   * Billable status filter applied to the estimate when `source` is `tasks`. Ignored when `source` is `capacity_plans` or `none`. When not provided, defaults to `billable`.
   */
  billable_status_filter?: BudgetEstimateRequest.BillableStatusFilterEnum;
  /**
   * The data source for the estimate. `tasks`: use task-level estimated time attributed to the parent. `capacity_plans`: use capacity plan estimates attributed to the parent. `none`: disables the estimate; only valid when `enabled` is `false`. When `enabled` is `true`, `source` must not be `none`.
   */
  source?: BudgetEstimateRequest.SourceEnum;
  /**
   * Controls whether the estimate is displayed in the budget. This flag primarily affects UI presentation and the response payload. When `false` (and `source` is `none`), the estimate is hidden and the API response will return `value: null` and `units: null` for this field.
   */
  enabled?: boolean;
}
export namespace BudgetEstimateRequest {
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


