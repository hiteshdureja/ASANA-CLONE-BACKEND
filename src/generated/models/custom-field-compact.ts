import { CustomFieldCompactEnumValue } from './custom-field-compact-enum-value';
import { EnumOption } from './enum-option';
import { CustomFieldCompactDateValue } from './custom-field-compact-date-value';


/**
 * Custom Fields store the metadata that is used in order to add user-specified information to tasks in Asana. Be sure to reference the [custom fields](/reference/custom-fields) developer documentation for more information about how custom fields relate to various resources in Asana.  Users in Asana can [lock custom fields](https://asana.com/guide/help/premium/custom-fields#gl-lock-fields), which will make them read-only when accessed by other users. Attempting to edit a locked custom field will return HTTP error code `403 Forbidden`.
 */
export interface CustomFieldCompact { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The name of the custom field.
   */
  name?: string;
  /**
   * *Deprecated: new integrations should prefer the resource_subtype field.* The type of the custom field. Must be one of the given values. 
   */
  readonly type?: CustomFieldCompact.TypeEnum;
  /**
   * *Conditional*. Only relevant for custom fields of type `enum` or `multi_enum`. This array specifies the possible values which an `enum` custom field can adopt. To modify the enum options, refer to [working with enum options](/reference/createenumoptionforcustomfield).
   */
  enum_options?: Array<EnumOption>;
  /**
   * *Conditional*. This field applies only to [custom field values](/docs/custom-fields-guide#/accessing-custom-field-values-on-tasks-or-projects) and is not available for [custom field definitions](/docs/custom-fields-guide#/accessing-custom-field-definitions). Determines if the custom field is enabled or not. For more details, see the [Custom Fields documentation](/docs/custom-fields-guide#/enabled-and-disabled-values).
   */
  readonly enabled?: boolean;
  /**
   * This field tells the type of the custom field.
   */
  readonly representation_type?: CustomFieldCompact.RepresentationTypeEnum;
  /**
   * This field is the unique custom ID string for the custom field.
   */
  id_prefix?: string | null;
  /**
   * *Conditional*. Only relevant for custom fields of type `reference`. This array of strings reflects the allowed types of objects that can be written to a `reference` custom field value.
   */
  input_restrictions?: Array<string>;
  /**
   * *Conditional*. This flag describes whether a custom field is a formula custom field.
   */
  is_formula_field?: boolean;
  date_value?: CustomFieldCompactDateValue | null;
  enum_value?: CustomFieldCompactEnumValue;
  /**
   * *Conditional*. Only relevant for custom fields of type `multi_enum`. This object is the chosen values of a `multi_enum` custom field.
   */
  multi_enum_values?: Array<EnumOption>;
  /**
   * *Conditional*. This number is the value of a `number` custom field.
   */
  number_value?: number | null;
  /**
   * *Conditional*. This string is the value of a `text` custom field.
   */
  text_value?: string | null;
  /**
   * A string representation for the value of the custom field. Integrations that don\'t require the underlying type should use this field to read values. Using this field will future-proof an app against new custom field types.
   */
  readonly display_value?: string | null;
}
export namespace CustomFieldCompact {
  export const TypeEnum = {
    Text: 'text',
    Enum: 'enum',
    MultiEnum: 'multi_enum',
    Number: 'number',
    Date: 'date',
    People: 'people'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
  export const RepresentationTypeEnum = {
    Text: 'text',
    Enum: 'enum',
    MultiEnum: 'multi_enum',
    Number: 'number',
    Date: 'date',
    People: 'people',
    Formula: 'formula',
    CustomId: 'custom_id'
  } as const;
  export type RepresentationTypeEnum = typeof RepresentationTypeEnum[keyof typeof RepresentationTypeEnum];
}


