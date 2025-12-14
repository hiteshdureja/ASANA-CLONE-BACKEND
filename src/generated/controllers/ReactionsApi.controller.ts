import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReactionsApi } from '../api';
import { GetReactionsOnObject200Response,  } from '../models';

@Controller()
export class ReactionsApiController {
  constructor(private readonly reactionsApi: ReactionsApi) {}

  @Get('/reactions')
  getReactionsOnObject(@Query('target') target: string, @Query('emojiBase') emojiBase: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Req() request: Request): GetReactionsOnObject200Response | Promise<GetReactionsOnObject200Response> | Observable<GetReactionsOnObject200Response> {
    return this.reactionsApi.getReactionsOnObject(target, emojiBase, optPretty, limit, offset, request);
  }

} 