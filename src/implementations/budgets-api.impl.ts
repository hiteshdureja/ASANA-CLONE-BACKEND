import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BudgetsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class BudgetsApiImpl extends BudgetsApi {
  createBudget(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  deleteBudget(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getBudget(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getBudgets(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updateBudget(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
