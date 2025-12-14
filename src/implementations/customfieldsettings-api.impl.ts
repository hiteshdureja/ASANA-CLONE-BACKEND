import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomFieldSettingsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class CustomFieldSettingsApiImpl extends CustomFieldSettingsApi {
  getCustomFieldSettingsForGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getCustomFieldSettingsForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getCustomFieldSettingsForProject(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getCustomFieldSettingsForTeam(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
