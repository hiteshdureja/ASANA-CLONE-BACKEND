import { PlaceholderCompact } from './placeholder-compact';
import { ProjectCompact } from './project-compact';
import { PlaceholderRateCompact } from './placeholder-rate-compact';
import { UserCompact } from './user-compact';
import { RateCompact } from './rate-compact';


export interface RateOrPlaceholderCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  parent?: ProjectCompact;
  resource?: PlaceholderCompact;
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

