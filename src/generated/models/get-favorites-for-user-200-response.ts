import { AsanaNamedResource } from './asana-named-resource';
import { NextPage } from './next-page';


export interface GetFavoritesForUser200Response { 
  data?: Array<AsanaNamedResource>;
  next_page?: NextPage | null;
}

