import { AttachmentResponseAllOfParent } from './attachment-response-all-of-parent';


export interface AttachmentResponse { 
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
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * The URL containing the content of the attachment. *Note:* May be null if the attachment is hosted by [Box](https://www.box.com/) and will be null if the attachment is a Video Message hosted by [Vimeo](https://vimeo.com/). If present, this URL may only be valid for two minutes from the time of retrieval. You should avoid persisting this URL somewhere and just refresh it on demand to ensure you do not keep stale URLs.
   */
  readonly download_url?: string | null;
  /**
   * A stable URL for accessing the attachment through the Asana web application. This URL redirects to the file download location (e.g., an S3 link) if the user is authenticated and authorized to view the parent object (e.g., a task). Unauthorized users will receive a `403 Forbidden` response. This link is persistent and does not expire, but requires an active session to resolve.
   */
  readonly permanent_url?: string | null;
  /**
   * The service hosting the attachment. Valid values are `asana`, `dropbox`, `gdrive`, `onedrive`, `box`, `vimeo`, and `external`.
   */
  readonly host?: string;
  parent?: AttachmentResponseAllOfParent;
  /**
   * The size of the attachment in bytes. Only present when the `resource_subtype` is `asana`.
   */
  readonly size?: number;
  /**
   * The URL where the attachment can be viewed, which may be friendlier to users in a browser than just directing them to a raw file. May be null if no view URL exists for the service.
   */
  readonly view_url?: string | null;
  /**
   * Whether the attachment is connected to the app making the request for the purposes of showing an app components widget. Only present when the `resource_subtype` is `external` or `gdrive`.
   */
  readonly connected_to_app?: boolean;
}

