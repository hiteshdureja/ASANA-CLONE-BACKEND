import { Body, Controller, Post, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RulesApi } from '../api';
import type { TriggerRule200Response, TriggerRuleRequest,  } from '../models';

@Controller()
export class RulesApiController {
  constructor(private readonly rulesApi: RulesApi) {}

  @Post('/rule_triggers/:rule_trigger_gid/run')
  triggerRule(@Param('ruleTriggerGid') ruleTriggerGid: string, @Body() triggerRuleRequest: TriggerRuleRequest, @Req() request: Request): TriggerRule200Response | Promise<TriggerRule200Response> | Observable<TriggerRule200Response> {
    return this.rulesApi.triggerRule(ruleTriggerGid, triggerRuleRequest, request);
  }

} 