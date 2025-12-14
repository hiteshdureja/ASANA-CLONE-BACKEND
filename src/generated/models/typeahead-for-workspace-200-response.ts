import { AsanaNamedResource } from './asana-named-resource';


/**
 * A generic list of objects, such as those returned by the typeahead search endpoint.
 */
export interface TypeaheadForWorkspace200Response { 
  data?: Array<AsanaNamedResource>;
}

