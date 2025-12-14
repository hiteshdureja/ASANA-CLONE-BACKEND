import { ProjectCompact } from './project-compact';
import { UserCompact } from './user-compact';


/**
 * A *rate* is a monetary value assigned to a resource - `user` or `placeholder` - for a given `parent` object.
 */
export interface RateCompact { 
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

