import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PortfoliosApi } from '../generated/api';
import * as Models from '../generated/models';

@Injectable()
export class PortfoliosApiImpl extends PortfoliosApi {
  addCustomFieldSettingForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  addItemForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  addMembersForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  createPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  deletePortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getItemsForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  getPortfolios(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  removeCustomFieldSettingForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  removeItemForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  removeMembersForPortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

  updatePortfolio(...args: any[]): any {
    throw new Error('Method not implemented.');
  }

}
