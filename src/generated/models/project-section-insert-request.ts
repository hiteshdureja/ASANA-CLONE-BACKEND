

export interface ProjectSectionInsertRequest { 
  /**
   * The section to reorder.
   */
  section: string;
  /**
   * Insert the given section immediately before the section specified by this parameter.
   */
  before_section?: string;
  /**
   * Insert the given section immediately after the section specified by this parameter.
   */
  after_section?: string;
}

