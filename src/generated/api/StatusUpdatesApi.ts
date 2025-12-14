import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateStatusForObjectRequest, GetStatus200Response, GetStatusesForObject200Response,  } from '../models';


@Injectable()
export abstract class StatusUpdatesApi {

  abstract createStatusForObject(createStatusForObjectRequest: CreateStatusForObjectRequest, optPretty: boolean, limit: number, offset: string, optFields: Array<'author' | 'author.name' | 'created_at' | 'created_by' | 'created_by.name' | 'hearted' | 'hearts' | 'hearts.user' | 'hearts.user.name' | 'html_text' | 'liked' | 'likes' | 'likes.user' | 'likes.user.name' | 'modified_at' | 'num_hearts' | 'num_likes' | 'parent' | 'parent.name' | 'reaction_summary' | 'reaction_summary.count' | 'reaction_summary.emoji_base' | 'reaction_summary.reacted' | 'reaction_summary.variant' | 'resource_subtype' | 'status_type' | 'text' | 'title'>,  request: Request): GetStatus200Response | Promise<GetStatus200Response> | Observable<GetStatus200Response>;


  abstract deleteStatus(statusUpdateGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getStatus(statusUpdateGid: string, optPretty: boolean, optFields: Array<'author' | 'author.name' | 'created_at' | 'created_by' | 'created_by.name' | 'hearted' | 'hearts' | 'hearts.user' | 'hearts.user.name' | 'html_text' | 'liked' | 'likes' | 'likes.user' | 'likes.user.name' | 'modified_at' | 'num_hearts' | 'num_likes' | 'parent' | 'parent.name' | 'reaction_summary' | 'reaction_summary.count' | 'reaction_summary.emoji_base' | 'reaction_summary.reacted' | 'reaction_summary.variant' | 'resource_subtype' | 'status_type' | 'text' | 'title'>,  request: Request): GetStatus200Response | Promise<GetStatus200Response> | Observable<GetStatus200Response>;


  abstract getStatusesForObject(parent: string, optPretty: boolean, limit: number, offset: string, createdSince: string, optFields: Array<'author' | 'author.name' | 'created_at' | 'created_by' | 'created_by.name' | 'hearted' | 'hearts' | 'hearts.user' | 'hearts.user.name' | 'html_text' | 'liked' | 'likes' | 'likes.user' | 'likes.user.name' | 'modified_at' | 'num_hearts' | 'num_likes' | 'offset' | 'parent' | 'parent.name' | 'path' | 'reaction_summary' | 'reaction_summary.count' | 'reaction_summary.emoji_base' | 'reaction_summary.reacted' | 'reaction_summary.variant' | 'resource_subtype' | 'status_type' | 'text' | 'title' | 'uri'>,  request: Request): GetStatusesForObject200Response | Promise<GetStatusesForObject200Response> | Observable<GetStatusesForObject200Response>;

} 