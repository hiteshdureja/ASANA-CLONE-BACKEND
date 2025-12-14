import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoalsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class GoalsApiImpl extends GoalsApi {
  addCustomFieldSettingForGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  addFollowers(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  createGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  createGoalMetric(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  deleteGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getGoals(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getParentGoalsForGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  removeCustomFieldSettingForGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  removeFollowers(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateGoal(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateGoalMetric(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
