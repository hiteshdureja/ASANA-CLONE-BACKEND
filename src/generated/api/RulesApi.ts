import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TriggerRule200Response, TriggerRuleRequest,  } from '../models';


@Injectable()
export abstract class RulesApi {

  abstract triggerRule(ruleTriggerGid: string, triggerRuleRequest: TriggerRuleRequest,  request: Request): TriggerRule200Response | Promise<TriggerRule200Response> | Observable<TriggerRule200Response>;

} 