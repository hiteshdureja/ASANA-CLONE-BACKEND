

/**
 * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>time_periods:read</code></p>  A generic Asana Resource, containing a globally unique identifier.
 */
export interface TimePeriodCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The localized end date of the time period in `YYYY-MM-DD` format.
   */
  end_on?: string;
  /**
   * The localized start date of the time period in `YYYY-MM-DD` format.
   */
  start_on?: string;
  /**
   * The cadence and index of the time period.
   */
  period?: TimePeriodCompact.PeriodEnum;
  /**
   * A string representing the cadence code and the fiscal year.
   */
  display_name?: string;
}
export namespace TimePeriodCompact {
  export const PeriodEnum = {
    Fy: 'FY',
    H1: 'H1',
    H2: 'H2',
    Q1: 'Q1',
    Q2: 'Q2',
    Q3: 'Q3',
    Q4: 'Q4'
  } as const;
  export type PeriodEnum = typeof PeriodEnum[keyof typeof PeriodEnum];
}


