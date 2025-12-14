import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskTemplatesApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class TaskTemplatesApiImpl extends TaskTemplatesApi {
  deleteTaskTemplate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getTaskTemplate(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getTaskTemplates(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  instantiateTask(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
