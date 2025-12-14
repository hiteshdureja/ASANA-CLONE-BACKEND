

/**
 * *Conditional*. Only relevant for custom fields of type `date`. This object reflects the chosen date (and optionally, time) value of a `date` custom field. If no date is selected, the value of `date_value` will be `null`.
 */
export interface CustomFieldCompactDateValue { 
  /**
   * A string representing the date in YYYY-MM-DD format.
   */
  date?: string;
  /**
   * A string representing the date in ISO 8601 format. If no time value is selected, the value of `date-time` will be `null`.
   */
  date_time?: string;
}

