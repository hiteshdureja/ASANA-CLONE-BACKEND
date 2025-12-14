

/**
 * An *attachment* object represents any file attached to a task in Asana, whether it\'s an uploaded file or one associated via a third-party service such as Dropbox or Google Drive.
 */
export interface AttachmentCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the file.
   */
  readonly name?: string;
  /**
   * The service hosting the attachment. Valid values are `asana`, `dropbox`, `gdrive`, `onedrive`, `box`, `vimeo`, and `external`.
   */
  resource_subtype?: string;
}

