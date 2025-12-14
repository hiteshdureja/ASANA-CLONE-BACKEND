import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BudgetsApi } from '../api';
import type { ApproveAccessRequest200Response, CreateBudget201Response, CreateBudgetRequest, GetBudgets200Response,  } from '../models';

@Controller()
export class BudgetsApiController {
  constructor(private readonly budgetsApi: BudgetsApi) {}

  @Post('/budgets')
  createBudget(@Body() createBudgetRequest: CreateBudgetRequest, @Query('optPretty') optPretty: boolean, @Req() request: Request): CreateBudget201Response | Promise<CreateBudget201Response> | Observable<CreateBudget201Response> {
    return this.budgetsApi.createBudget(createBudgetRequest, optPretty, request);
  }

  @Delete('/budgets/:budget_gid')
  deleteBudget(@Param('budgetGid') budgetGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.budgetsApi.deleteBudget(budgetGid, optPretty, request);
  }

  @Get('/budgets/:budget_gid')
  getBudget(@Param('budgetGid') budgetGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'actual' | 'actual.billable_status_filter' | 'actual.units' | 'actual.value' | 'budget_type' | 'estimate' | 'estimate.billable_status_filter' | 'estimate.enabled' | 'estimate.source' | 'estimate.units' | 'estimate.value' | 'parent' | 'parent.name' | 'total' | 'total.enabled' | 'total.units' | 'total.value'>, @Req() request: Request): CreateBudget201Response | Promise<CreateBudget201Response> | Observable<CreateBudget201Response> {
    return this.budgetsApi.getBudget(budgetGid, optPretty, optFields, request);
  }

  @Get('/budgets')
  getBudgets(@Query('parent') parent: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): GetBudgets200Response | Promise<GetBudgets200Response> | Observable<GetBudgets200Response> {
    return this.budgetsApi.getBudgets(parent, optPretty, request);
  }

  @Put('/budgets/:budget_gid')
  updateBudget(@Param('budgetGid') budgetGid: string, @Body() createBudgetRequest: CreateBudgetRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'actual' | 'actual.billable_status_filter' | 'actual.units' | 'actual.value' | 'budget_type' | 'estimate' | 'estimate.billable_status_filter' | 'estimate.enabled' | 'estimate.source' | 'estimate.units' | 'estimate.value' | 'parent' | 'parent.name' | 'total' | 'total.enabled' | 'total.units' | 'total.value'>, @Req() request: Request): CreateBudget201Response | Promise<CreateBudget201Response> | Observable<CreateBudget201Response> {
    return this.budgetsApi.updateBudget(budgetGid, createBudgetRequest, optPretty, optFields, request);
  }

} 