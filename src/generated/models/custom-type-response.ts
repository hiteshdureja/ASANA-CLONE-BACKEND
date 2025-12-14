import { CustomTypeStatusOptionResponse } from './custom-type-status-option-response';


export interface CustomTypeResponse { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the custom type.
   */
  name?: string;
  /**
   * The available options for the custom type.
   */
  status_options?: Array<CustomTypeStatusOptionResponse> | null;
}

