

/**
 * A collection of rich text that will be displayed as a preview to another app.  This is read-only except for a small group of whitelisted apps.
 */
export interface Preview { 
  /**
   * Some fallback text to display if unable to display the full preview.
   */
  fallback?: string;
  /**
   * Text to display in the footer.
   */
  footer?: string;
  /**
   * Text to display in the header.
   */
  header?: string;
  /**
   * Where the header will link to.
   */
  header_link?: string;
  /**
   * HTML formatted text for the body of the preview.
   */
  html_text?: string;
  /**
   * Text for the body of the preview.
   */
  text?: string;
  /**
   * Text to display as the title.
   */
  title?: string;
  /**
   * Where to title will link to.
   */
  title_link?: string;
}

