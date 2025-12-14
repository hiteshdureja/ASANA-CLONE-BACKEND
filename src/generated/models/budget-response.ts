import { BudgetResponseAllOfParent } from './budget-response-all-of-parent';
import { BudgetActualResponse } from './budget-actual-response';
import { BudgetEstimateResponse } from './budget-estimate-response';
import { BudgetTotalResponse } from './budget-total-response';


export interface BudgetResponse { 
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
  budget_type?: BudgetResponse.BudgetTypeEnum;
  estimate?: BudgetEstimateResponse;
  actual?: BudgetActualResponse;
  total?: BudgetTotalResponse;
  parent?: BudgetResponseAllOfParent;
}
export namespace BudgetResponse {
  export const BudgetTypeEnum = {
    Cost: 'cost',
    Time: 'time'
  } as const;
  export type BudgetTypeEnum = typeof BudgetTypeEnum[keyof typeof BudgetTypeEnum];
}


