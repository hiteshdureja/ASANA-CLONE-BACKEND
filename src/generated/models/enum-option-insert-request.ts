

export interface EnumOptionInsertRequest { 
  /**
   * The gid of the enum option to relocate.
   */
  enum_option: string;
  /**
   * An existing enum option within this custom field before which the new enum option should be inserted. Cannot be provided together with after_enum_option.
   */
  before_enum_option?: string;
  /**
   * An existing enum option within this custom field after which the new enum option should be inserted. Cannot be provided together with before_enum_option.
   */
  after_enum_option?: string;
}

