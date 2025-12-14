

export interface MembershipUpdateRequest { 
  /**
   * The role given to the member. Goals can have access levels `editor` or `commenter`. Projects can have access levels `admin`, `editor` or `commenter`. Portfolios can have access levels `admin`, `editor` or `viewer`.
   */
  access_level?: string;
}

