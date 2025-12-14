import { Body, Controller, Delete, Get, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StatusUpdatesApi } from '../api';
import type { ApproveAccessRequest200Response, CreateStatusForObjectRequest, GetStatus200Response, GetStatusesForObject200Response,  } from '../models';

@Controller()
export class StatusUpdatesApiController {
  constructor(private readonly statusUpdatesApi: StatusUpdatesApi) {}

  @Post('/status_updates')
  createStatusForObject(@Body() createStatusForObjectRequest: CreateStatusForObjectRequest, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'author' | 'author.name' | 'created_at' | 'created_by' | 'created_by.name' | 'hearted' | 'hearts' | 'hearts.user' | 'hearts.user.name' | 'html_text' | 'liked' | 'likes' | 'likes.user' | 'likes.user.name' | 'modified_at' | 'num_hearts' | 'num_likes' | 'parent' | 'parent.name' | 'reaction_summary' | 'reaction_summary.count' | 'reaction_summary.emoji_base' | 'reaction_summary.reacted' | 'reaction_summary.variant' | 'resource_subtype' | 'status_type' | 'text' | 'title'>, @Req() request: Request): GetStatus200Response | Promise<GetStatus200Response> | Observable<GetStatus200Response> {
    return this.statusUpdatesApi.createStatusForObject(createStatusForObjectRequest, optPretty, limit, offset, optFields, request);
  }

  @Delete('/status_updates/:status_update_gid')
  deleteStatus(@Param('statusUpdateGid') statusUpdateGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.statusUpdatesApi.deleteStatus(statusUpdateGid, optPretty, request);
  }

  @Get('/status_updates/:status_update_gid')
  getStatus(@Param('statusUpdateGid') statusUpdateGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'author' | 'author.name' | 'created_at' | 'created_by' | 'created_by.name' | 'hearted' | 'hearts' | 'hearts.user' | 'hearts.user.name' | 'html_text' | 'liked' | 'likes' | 'likes.user' | 'likes.user.name' | 'modified_at' | 'num_hearts' | 'num_likes' | 'parent' | 'parent.name' | 'reaction_summary' | 'reaction_summary.count' | 'reaction_summary.emoji_base' | 'reaction_summary.reacted' | 'reaction_summary.variant' | 'resource_subtype' | 'status_type' | 'text' | 'title'>, @Req() request: Request): GetStatus200Response | Promise<GetStatus200Response> | Observable<GetStatus200Response> {
    return this.statusUpdatesApi.getStatus(statusUpdateGid, optPretty, optFields, request);
  }

  @Get('/status_updates')
  getStatusesForObject(@Query('parent') parent: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('createdSince') createdSince: string, @Query('optFields') optFields: Array<'author' | 'author.name' | 'created_at' | 'created_by' | 'created_by.name' | 'hearted' | 'hearts' | 'hearts.user' | 'hearts.user.name' | 'html_text' | 'liked' | 'likes' | 'likes.user' | 'likes.user.name' | 'modified_at' | 'num_hearts' | 'num_likes' | 'offset' | 'parent' | 'parent.name' | 'path' | 'reaction_summary' | 'reaction_summary.count' | 'reaction_summary.emoji_base' | 'reaction_summary.reacted' | 'reaction_summary.variant' | 'resource_subtype' | 'status_type' | 'text' | 'title' | 'uri'>, @Req() request: Request): GetStatusesForObject200Response | Promise<GetStatusesForObject200Response> | Observable<GetStatusesForObject200Response> {
    return this.statusUpdatesApi.getStatusesForObject(parent, optPretty, limit, offset, createdSince, optFields, request);
  }

} 