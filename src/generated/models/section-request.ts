

export interface SectionRequest { 
  /**
   * The text to be displayed as the section name. This cannot be an empty string.
   */
  name: string;
  /**
   * An existing section within this project before which the added section should be inserted. Cannot be provided together with insert_after.
   */
  insert_before?: string;
  /**
   * An existing section within this project after which the added section should be inserted. Cannot be provided together with insert_before.
   */
  insert_after?: string;
}

