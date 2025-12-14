import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoalRelationshipsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class GoalRelationshipsApiImpl extends GoalRelationshipsApi {
  addSupportingRelationship(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getGoalRelationship(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getGoalRelationships(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  removeSupportingRelationship(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateGoalRelationship(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
