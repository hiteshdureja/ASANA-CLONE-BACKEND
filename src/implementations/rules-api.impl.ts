import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RulesApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class RulesApiImpl extends RulesApi {
  triggerRule(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
