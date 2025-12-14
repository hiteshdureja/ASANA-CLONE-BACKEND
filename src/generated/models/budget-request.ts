import { BudgetTotalRequest } from './budget-total-request';
import { BudgetEstimateRequest } from './budget-estimate-request';
import { BudgetActualRequest } from './budget-actual-request';


export interface BudgetRequest { 
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
  budget_type?: BudgetRequest.BudgetTypeEnum;
  estimate?: BudgetEstimateRequest;
  actual?: BudgetActualRequest;
  total?: BudgetTotalRequest;
  /**
   * Globally unique ID of the parent object: project. Can only be set on create, immutable thereafter.
   */
  parent?: string;
}
export namespace BudgetRequest {
  export const BudgetTypeEnum = {
    Cost: 'cost',
    Time: 'time'
  } as const;
  export type BudgetTypeEnum = typeof BudgetTypeEnum[keyof typeof BudgetTypeEnum];
}


