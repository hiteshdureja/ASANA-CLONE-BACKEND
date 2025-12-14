import { ProjectCompact } from './project-compact';
import { SectionCompact } from './section-compact';


export interface TaskBaseAllOfMemberships { 
  project?: ProjectCompact;
  section?: SectionCompact;
}

