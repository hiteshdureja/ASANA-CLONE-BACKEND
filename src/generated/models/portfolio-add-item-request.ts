

export interface PortfolioAddItemRequest { 
  /**
   * The item to add to the portfolio.
   */
  item: string;
  /**
   * An id of an item in this portfolio. The new item will be added before the one specified here. `insert_before` and `insert_after` parameters cannot both be specified.
   */
  insert_before?: string;
  /**
   * An id of an item in this portfolio. The new item will be added after the one specified here. `insert_before` and `insert_after` parameters cannot both be specified.
   */
  insert_after?: string;
}

