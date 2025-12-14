import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddSupportingRelationshipRequest, ApproveAccessRequest200Response, GetGoalRelationship200Response, GetGoalRelationships200Response, RemoveSupportingRelationshipRequest, UpdateGoalRelationshipRequest,  } from '../models';


@Injectable()
export abstract class GoalRelationshipsApi {

  abstract addSupportingRelationship(goalGid: string, addSupportingRelationshipRequest: AddSupportingRelationshipRequest, optPretty: boolean, optFields: Array<'contribution_weight' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name'>,  request: Request): GetGoalRelationship200Response | Promise<GetGoalRelationship200Response> | Observable<GetGoalRelationship200Response>;


  abstract getGoalRelationship(goalRelationshipGid: string, optPretty: boolean, optFields: Array<'contribution_weight' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name'>,  request: Request): GetGoalRelationship200Response | Promise<GetGoalRelationship200Response> | Observable<GetGoalRelationship200Response>;


  abstract getGoalRelationships(supportedGoal: string, optPretty: boolean, limit: number, offset: string, resourceSubtype: string, optFields: Array<'contribution_weight' | 'offset' | 'path' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name' | 'uri'>,  request: Request): GetGoalRelationships200Response | Promise<GetGoalRelationships200Response> | Observable<GetGoalRelationships200Response>;


  abstract removeSupportingRelationship(goalGid: string, removeSupportingRelationshipRequest: RemoveSupportingRelationshipRequest, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract updateGoalRelationship(goalRelationshipGid: string, updateGoalRelationshipRequest: UpdateGoalRelationshipRequest, optPretty: boolean, optFields: Array<'contribution_weight' | 'resource_subtype' | 'supported_goal' | 'supported_goal.name' | 'supported_goal.owner' | 'supported_goal.owner.name' | 'supporting_resource' | 'supporting_resource.name'>,  request: Request): GetGoalRelationship200Response | Promise<GetGoalRelationship200Response> | Observable<GetGoalRelationship200Response>;

} 