import { AddCustomFieldSettingRequestCustomField } from './add-custom-field-setting-request-custom-field';


export interface AddCustomFieldSettingRequest { 
  custom_field: AddCustomFieldSettingRequestCustomField;
  /**
   * Whether this field should be considered important to this container (for instance, to display in the list view of items in the container).
   */
  is_important?: boolean;
  /**
   * A gid of a Custom Field Setting on this container, before which the new Custom Field Setting will be added.  `insert_before` and `insert_after` parameters cannot both be specified.
   */
  insert_before?: string;
  /**
   * A gid of a Custom Field Setting on this container, after which the new Custom Field Setting will be added.  `insert_before` and `insert_after` parameters cannot both be specified.
   */
  insert_after?: string;
}

