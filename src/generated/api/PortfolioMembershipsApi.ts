import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetPortfolioMembership200Response, GetPortfolioMemberships200Response,  } from '../models';


@Injectable()
export abstract class PortfolioMembershipsApi {

  abstract getPortfolioMembership(portfolioMembershipGid: string, optPretty: boolean, optFields: Array<'access_level' | 'portfolio' | 'portfolio.name' | 'user' | 'user.name'>,  request: Request): GetPortfolioMembership200Response | Promise<GetPortfolioMembership200Response> | Observable<GetPortfolioMembership200Response>;


  abstract getPortfolioMemberships(portfolio: string, workspace: string, user: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'access_level' | 'offset' | 'path' | 'portfolio' | 'portfolio.name' | 'uri' | 'user' | 'user.name'>,  request: Request): GetPortfolioMemberships200Response | Promise<GetPortfolioMemberships200Response> | Observable<GetPortfolioMemberships200Response>;


  abstract getPortfolioMembershipsForPortfolio(portfolioGid: string, user: string, optPretty: boolean, limit: number, offset: string, optFields: Array<'access_level' | 'offset' | 'path' | 'portfolio' | 'portfolio.name' | 'uri' | 'user' | 'user.name'>,  request: Request): GetPortfolioMemberships200Response | Promise<GetPortfolioMemberships200Response> | Observable<GetPortfolioMemberships200Response>;

} 