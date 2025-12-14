import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomTypesApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class CustomTypesApiImpl extends CustomTypesApi {
  getCustomType(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getCustomTypes(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
