import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PortfolioMembershipsApi } from '../api';
import { GetPortfolioMembership200Response, GetPortfolioMemberships200Response,  } from '../models';

@Controller()
export class PortfolioMembershipsApiController {
  constructor(private readonly portfolioMembershipsApi: PortfolioMembershipsApi) {}

  @Get('/portfolio_memberships/:portfolio_membership_gid')
  getPortfolioMembership(@Param('portfolioMembershipGid') portfolioMembershipGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'access_level' | 'portfolio' | 'portfolio.name' | 'user' | 'user.name'>, @Req() request: Request): GetPortfolioMembership200Response | Promise<GetPortfolioMembership200Response> | Observable<GetPortfolioMembership200Response> {
    return this.portfolioMembershipsApi.getPortfolioMembership(portfolioMembershipGid, optPretty, optFields, request);
  }

  @Get('/portfolio_memberships')
  getPortfolioMemberships(@Query('portfolio') portfolio: string, @Query('workspace') workspace: string, @Query('user') user: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'access_level' | 'offset' | 'path' | 'portfolio' | 'portfolio.name' | 'uri' | 'user' | 'user.name'>, @Req() request: Request): GetPortfolioMemberships200Response | Promise<GetPortfolioMemberships200Response> | Observable<GetPortfolioMemberships200Response> {
    return this.portfolioMembershipsApi.getPortfolioMemberships(portfolio, workspace, user, optPretty, limit, offset, optFields, request);
  }

  @Get('/portfolios/:portfolio_gid/portfolio_memberships')
  getPortfolioMembershipsForPortfolio(@Param('portfolioGid') portfolioGid: string, @Query('user') user: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'access_level' | 'offset' | 'path' | 'portfolio' | 'portfolio.name' | 'uri' | 'user' | 'user.name'>, @Req() request: Request): GetPortfolioMemberships200Response | Promise<GetPortfolioMemberships200Response> | Observable<GetPortfolioMemberships200Response> {
    return this.portfolioMembershipsApi.getPortfolioMembershipsForPortfolio(portfolioGid, user, optPretty, limit, offset, optFields, request);
  }

} 