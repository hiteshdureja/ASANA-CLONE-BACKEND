import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApproveAccessRequest200Response, CreateRate201Response, CreateRateRequest, GetRates200Response, UpdateRateRequest,  } from '../models';


@Injectable()
export abstract class RatesApi {

  abstract createRate(createRateRequest: CreateRateRequest, optPretty: boolean, optFields: Array<'created_by' | 'created_by.name' | 'currency_code' | 'parent' | 'parent.name' | 'rate' | 'resource' | 'resource.name'>,  request: Request): CreateRate201Response | Promise<CreateRate201Response> | Observable<CreateRate201Response>;


  abstract deleteRate(rateGid: string, optPretty: boolean,  request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response>;


  abstract getRate(rateGid: string, optPretty: boolean, optFields: Array<'created_by' | 'created_by.name' | 'currency_code' | 'parent' | 'parent.name' | 'rate' | 'resource' | 'resource.name'>,  request: Request): CreateRate201Response | Promise<CreateRate201Response> | Observable<CreateRate201Response>;


  abstract getRates(optPretty: boolean, parent: string, resource: string, limit: number, offset: string, optFields: Array<'offset' | 'path' | 'uri'>,  request: Request): GetRates200Response | Promise<GetRates200Response> | Observable<GetRates200Response>;


  abstract updateRate(rateGid: string, updateRateRequest: UpdateRateRequest, optPretty: boolean, optFields: Array<'created_by' | 'created_by.name' | 'currency_code' | 'parent' | 'parent.name' | 'rate' | 'resource' | 'resource.name'>,  request: Request): CreateRate201Response | Promise<CreateRate201Response> | Observable<CreateRate201Response>;

} 