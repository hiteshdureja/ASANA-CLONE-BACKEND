

/**
 * A summary of an emoji reaction on an object.
 */
export interface ReactionSummaryItemCompact { 
  /**
   * The emoji base character used in the reaction.
   */
  emoji_base?: string;
  /**
   * The full emoji string used in the reaction.
   */
  variant?: string;
  /**
   * The number of reactions with the emoji variant on the object.
   */
  count?: number;
  /**
   * Whether the current user has reacted with the emoji variant on the object.
   */
  reacted?: boolean;
}

