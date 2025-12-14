import { NextPage } from './next-page';
import { AttachmentCompact } from './attachment-compact';


export interface GetAttachmentsForObject200Response { 
  data?: Array<AttachmentCompact>;
  next_page?: NextPage | null;
}

