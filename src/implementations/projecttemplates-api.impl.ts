import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectTemplatesApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class ProjectTemplatesApiImpl extends ProjectTemplatesApi {
  deleteProjectTemplate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getProjectTemplate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getProjectTemplates(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getProjectTemplatesForTeam(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  instantiateProject(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
