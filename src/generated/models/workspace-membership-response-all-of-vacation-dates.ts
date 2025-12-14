

/**
 * Contains keys `start_on` and `end_on` for the vacation dates for the user in this workspace. If `start_on` is null, the entire `vacation_dates` object will be null. If `end_on` is before today, the entire `vacation_dates` object will be null.
 */
export interface WorkspaceMembershipResponseAllOfVacationDates { 
  /**
   * The day on which the user\'s vacation in this workspace starts. This is a date with `YYYY-MM-DD` format.
   */
  start_on?: string;
  /**
   * The day on which the user\'s vacation in this workspace ends, or null if there is no end date. This is a date with `YYYY-MM-DD` format.
   */
  end_on?: string | null;
}

