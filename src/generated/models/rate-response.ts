import { ProjectCompact } from './project-compact';
import { UserCompact } from './user-compact';


export interface RateResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  parent?: ProjectCompact;
  resource?: UserCompact;
  /**
   * The monetary value of the rate.
   */
  rate?: number;
  /**
   * The currency code of the rate, set at the domain level.
   */
  readonly currency_code?: string;
  created_by?: UserCompact;
}

