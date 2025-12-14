import { UserCompact } from './user-compact';


/**
 * An object to represent a user\'s like.
 */
export interface Like { 
  /**
   * Globally unique identifier of the object, as a string.
   */
  readonly gid?: string;
  user?: UserCompact;
}

