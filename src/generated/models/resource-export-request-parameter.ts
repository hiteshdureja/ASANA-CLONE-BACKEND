import { ResourceExportFilters } from './resource-export-filters';


export interface ResourceExportRequestParameter { 
  /**
   * The type of the resource to be exported. This can be a task, team, or message.
   */
  resource_type?: string;
  filters?: ResourceExportFilters;
  /**
   * An array of fields to include for the resource type. If not provided, all non-optional fields for the resource type will be included. This conforms to the fields optional parameter available for all Asana endpoints which is documented [here](https://developers.asana.com/docs/inputoutput-options)
   */
  fields?: Array<string>;
}

