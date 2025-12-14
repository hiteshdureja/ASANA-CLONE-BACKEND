import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateBudget201Response, CreateBudgetRequest, GetBudgets200Response,  } from '../models';


@Injectable()
export abstract class BudgetsApi {

  abstract createBudget(createBudgetRequest: CreateBudgetRequest, optPretty: boolean,  request: Request): CreateBudget201Response | Promise<CreateBudget201Response> | Observable<CreateBudget201Response>;


  abstract deleteBudget(budgetGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getBudget(budgetGid: string, optPretty: boolean, optFields: Array<'actual' | 'actual.billable_status_filter' | 'actual.units' | 'actual.value' | 'budget_type' | 'estimate' | 'estimate.billable_status_filter' | 'estimate.enabled' | 'estimate.source' | 'estimate.units' | 'estimate.value' | 'parent' | 'parent.name' | 'total' | 'total.enabled' | 'total.units' | 'total.value'>,  request: Request): CreateBudget201Response | Promise<CreateBudget201Response> | Observable<CreateBudget201Response>;


  abstract getBudgets(parent: string, optPretty: boolean,  request: Request): GetBudgets200Response | Promise<GetBudgets200Response> | Observable<GetBudgets200Response>;


  abstract updateBudget(budgetGid: string, createBudgetRequest: CreateBudgetRequest, optPretty: boolean, optFields: Array<'actual' | 'actual.billable_status_filter' | 'actual.units' | 'actual.value' | 'budget_type' | 'estimate' | 'estimate.billable_status_filter' | 'estimate.enabled' | 'estimate.source' | 'estimate.units' | 'estimate.value' | 'parent' | 'parent.name' | 'total' | 'total.enabled' | 'total.units' | 'total.value'>,  request: Request): CreateBudget201Response | Promise<CreateBudget201Response> | Observable<CreateBudget201Response>;

} 