import { Body, Controller, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoalRelationshipsApi } from '../api';
import type { AddSupportingRelationshipRequest, ApproveAccessRequest200Response, GetGoalRelationship200Response, GetGoalRelationships200Response, RemoveSupportingRelationshipRequest, UpdateGoalRelationshipRequest,  } from '../models';

@Controller()
export class GoalRelationshipsApiController {
  constructor(private readonly goalRelationshipsApi: GoalRelationshipsApi) {}

  @Post('/goals/:goal_gid/addSupportingRelationship')
  addSupportingRelationship(@Param('goalGid') goalGid: string, @Body() addSupportingRelationshipRequest: AddSupportingRelationshipRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'contribution_weight' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name'>, @Req() request: Request): GetGoalRelationship200Response | Promise<GetGoalRelationship200Response> | Observable<GetGoalRelationship200Response> {
    return this.goalRelationshipsApi.addSupportingRelationship(goalGid, addSupportingRelationshipRequest, optPretty, optFields, request);
  }

  @Get('/goal_relationships/:goal_relationship_gid')
  getGoalRelationship(@Param('goalRelationshipGid') goalRelationshipGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'contribution_weight' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name'>, @Req() request: Request): GetGoalRelationship200Response | Promise<GetGoalRelationship200Response> | Observable<GetGoalRelationship200Response> {
    return this.goalRelationshipsApi.getGoalRelationship(goalRelationshipGid, optPretty, optFields, request);
  }

  @Get('/goal_relationships')
  getGoalRelationships(@Query('supportedGoal') supportedGoal: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('resourceSubtype') resourceSubtype: string, @Query('optFields') optFields: Array<'contribution_weight' | 'offset' | 'path' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name' | 'uri'>, @Req() request: Request): GetGoalRelationships200Response | Promise<GetGoalRelationships200Response> | Observable<GetGoalRelationships200Response> {
    return this.goalRelationshipsApi.getGoalRelationships(supportedGoal, optPretty, limit, offset, resourceSubtype, optFields, request);
  }

  @Post('/goals/:goal_gid/removeSupportingRelationship')
  removeSupportingRelationship(@Param('goalGid') goalGid: string, @Body() removeSupportingRelationshipRequest: RemoveSupportingRelationshipRequest, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.goalRelationshipsApi.removeSupportingRelationship(goalGid, removeSupportingRelationshipRequest, optPretty, request);
  }

  @Put('/goal_relationships/:goal_relationship_gid')
  updateGoalRelationship(@Param('goalRelationshipGid') goalRelationshipGid: string, @Body() updateGoalRelationshipRequest: UpdateGoalRelationshipRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'contribution_weight' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name'>, @Req() request: Request): GetGoalRelationship200Response | Promise<GetGoalRelationship200Response> | Observable<GetGoalRelationship200Response> {
    return this.goalRelationshipsApi.updateGoalRelationship(goalRelationshipGid, updateGoalRelationshipRequest, optPretty, optFields, request);
  }

} 