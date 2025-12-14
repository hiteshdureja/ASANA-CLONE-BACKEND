import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetReactionsOnObject200Response,  } from '../models';


@Injectable()
export abstract class ReactionsApi {

  abstract getReactionsOnObject(target: string, emojiBase: string, optPretty: boolean, limit: number, offset: string,  request: Request): GetReactionsOnObject200Response | Promise<GetReactionsOnObject200Response> | Observable<GetReactionsOnObject200Response>;

} 