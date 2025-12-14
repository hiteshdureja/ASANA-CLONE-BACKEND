

/**
 * A *budget* object represents a budget for a given parent.
 */
export interface BudgetCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The type of the budget, in \"cost\" or \"time\". The value of this property will dictate how the corresponding values for actual, estimate, and total are interpreted.
   */
  budget_type?: BudgetCompact.BudgetTypeEnum;
}
export namespace BudgetCompact {
  export const BudgetTypeEnum = {
    Cost: 'cost',
    Time: 'time'
  } as const;
  export type BudgetTypeEnum = typeof BudgetTypeEnum[keyof typeof BudgetTypeEnum];
}


