import { ProjectTemplateCompact } from './project-template-compact';
import { NextPage } from './next-page';


export interface GetProjectTemplates200Response { 
  data?: Array<ProjectTemplateCompact>;
  next_page?: NextPage | null;
}

