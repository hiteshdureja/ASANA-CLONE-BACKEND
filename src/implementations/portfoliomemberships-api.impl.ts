import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PortfolioMembershipsApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class PortfolioMembershipsApiImpl extends PortfolioMembershipsApi {
  getPortfolioMembership(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getPortfolioMemberships(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getPortfolioMembershipsForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
