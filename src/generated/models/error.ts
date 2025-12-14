

export interface ModelError { 
  /**
   * Message providing more detail about the error that occurred, if available.
   */
  readonly message?: string;
  /**
   * Additional information directing developers to resources on how to address and fix the problem, if available.
   */
  readonly help?: string;
  /**
   * *500 errors only*. A unique error phrase which can be used when contacting developer support to help identify the exact occurrence of the problem in Asana\'s logs.
   */
  readonly phrase?: string;
}

