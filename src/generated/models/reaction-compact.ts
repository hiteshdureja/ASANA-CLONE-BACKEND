import { UserCompact } from './user-compact';


/**
 * An emoji reaction on an object.
 */
export interface ReactionCompact { 
  /**
   * The ID of the reaction object.
   */
  gid?: string;
  /**
   * The emoji string used in the reaction.
   */
  emoji?: string;
  user?: UserCompact;
}

