import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomFieldsApi } from '../api';
import type { ApproveAccessRequest200Response, CreateCustomField201Response, CreateCustomFieldRequest, CreateEnumOptionForCustomField201Response, CreateEnumOptionForCustomFieldRequest, GetCustomFieldsForWorkspace200Response, InsertEnumOptionForCustomFieldRequest, UpdateCustomFieldRequest, UpdateEnumOptionRequest,  } from '../models';

@Controller()
export class CustomFieldsApiController {
  constructor(private readonly customFieldsApi: CustomFieldsApi) {}

  @Post('/custom_fields')
  createCustomField(@Body() createCustomFieldRequest: CreateCustomFieldRequest, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'asana_created_field' | 'created_by' | 'created_by.name' | 'currency_code' | 'custom_label' | 'custom_label_position' | 'date_value' | 'date_value.date' | 'date_value.date_time' | 'default_access_level' | 'description' | 'display_value' | 'enabled' | 'enum_options' | 'enum_options.color' | 'enum_options.enabled' | 'enum_options.name' | 'enum_value' | 'enum_value.color' | 'enum_value.enabled' | 'enum_value.name' | 'format' | 'has_notifications_enabled' | 'id_prefix' | 'input_restrictions' | 'is_formula_field' | 'is_global_to_workspace' | 'is_value_read_only' | 'multi_enum_values' | 'multi_enum_values.color' | 'multi_enum_values.enabled' | 'multi_enum_values.name' | 'name' | 'number_value' | 'people_value' | 'people_value.name' | 'precision' | 'privacy_setting' | 'reference_value' | 'reference_value.name' | 'representation_type' | 'resource_subtype' | 'text_value' | 'type'>, @Req() request: Request): CreateCustomField201Response | Promise<CreateCustomField201Response> | Observable<CreateCustomField201Response> {
    return this.customFieldsApi.createCustomField(createCustomFieldRequest, optPretty, optFields, request);
  }

  @Post('/custom_fields/:custom_field_gid/enum_options')
  createEnumOptionForCustomField(@Param('customFieldGid') customFieldGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'enabled' | 'name'>, @Body() createEnumOptionForCustomFieldRequest: CreateEnumOptionForCustomFieldRequest, @Req() request: Request): CreateEnumOptionForCustomField201Response | Promise<CreateEnumOptionForCustomField201Response> | Observable<CreateEnumOptionForCustomField201Response> {
    return this.customFieldsApi.createEnumOptionForCustomField(customFieldGid, optPretty, optFields, createEnumOptionForCustomFieldRequest, request);
  }

  @Delete('/custom_fields/:custom_field_gid')
  deleteCustomField(@Param('customFieldGid') customFieldGid: string, @Query('optPretty') optPretty: boolean, @Req() request: Request): ApproveAccessRequest200Response | Promise<ApproveAccessRequest200Response> | Observable<ApproveAccessRequest200Response> {
    return this.customFieldsApi.deleteCustomField(customFieldGid, optPretty, request);
  }

  @Get('/custom_fields/:custom_field_gid')
  getCustomField(@Param('customFieldGid') customFieldGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'asana_created_field' | 'created_by' | 'created_by.name' | 'currency_code' | 'custom_label' | 'custom_label_position' | 'date_value' | 'date_value.date' | 'date_value.date_time' | 'default_access_level' | 'description' | 'display_value' | 'enabled' | 'enum_options' | 'enum_options.color' | 'enum_options.enabled' | 'enum_options.name' | 'enum_value' | 'enum_value.color' | 'enum_value.enabled' | 'enum_value.name' | 'format' | 'has_notifications_enabled' | 'id_prefix' | 'input_restrictions' | 'is_formula_field' | 'is_global_to_workspace' | 'is_value_read_only' | 'multi_enum_values' | 'multi_enum_values.color' | 'multi_enum_values.enabled' | 'multi_enum_values.name' | 'name' | 'number_value' | 'people_value' | 'people_value.name' | 'precision' | 'privacy_setting' | 'reference_value' | 'reference_value.name' | 'representation_type' | 'resource_subtype' | 'text_value' | 'type'>, @Req() request: Request): CreateCustomField201Response | Promise<CreateCustomField201Response> | Observable<CreateCustomField201Response> {
    return this.customFieldsApi.getCustomField(customFieldGid, optPretty, optFields, request);
  }

  @Get('/workspaces/:workspace_gid/custom_fields')
  getCustomFieldsForWorkspace(@Param('workspaceGid') workspaceGid: string, @Query('optPretty') optPretty: boolean, @Query('limit') limit: number, @Query('offset') offset: string, @Query('optFields') optFields: Array<'asana_created_field' | 'created_by' | 'created_by.name' | 'currency_code' | 'custom_label' | 'custom_label_position' | 'date_value' | 'date_value.date' | 'date_value.date_time' | 'default_access_level' | 'description' | 'display_value' | 'enabled' | 'enum_options' | 'enum_options.color' | 'enum_options.enabled' | 'enum_options.name' | 'enum_value' | 'enum_value.color' | 'enum_value.enabled' | 'enum_value.name' | 'format' | 'has_notifications_enabled' | 'id_prefix' | 'input_restrictions' | 'is_formula_field' | 'is_global_to_workspace' | 'is_value_read_only' | 'multi_enum_values' | 'multi_enum_values.color' | 'multi_enum_values.enabled' | 'multi_enum_values.name' | 'name' | 'number_value' | 'offset' | 'path' | 'people_value' | 'people_value.name' | 'precision' | 'privacy_setting' | 'reference_value' | 'reference_value.name' | 'representation_type' | 'resource_subtype' | 'text_value' | 'type' | 'uri'>, @Req() request: Request): GetCustomFieldsForWorkspace200Response | Promise<GetCustomFieldsForWorkspace200Response> | Observable<GetCustomFieldsForWorkspace200Response> {
    return this.customFieldsApi.getCustomFieldsForWorkspace(workspaceGid, optPretty, limit, offset, optFields, request);
  }

  @Post('/custom_fields/:custom_field_gid/enum_options/insert')
  insertEnumOptionForCustomField(@Param('customFieldGid') customFieldGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'enabled' | 'name'>, @Body() insertEnumOptionForCustomFieldRequest: InsertEnumOptionForCustomFieldRequest, @Req() request: Request): CreateEnumOptionForCustomField201Response | Promise<CreateEnumOptionForCustomField201Response> | Observable<CreateEnumOptionForCustomField201Response> {
    return this.customFieldsApi.insertEnumOptionForCustomField(customFieldGid, optPretty, optFields, insertEnumOptionForCustomFieldRequest, request);
  }

  @Put('/custom_fields/:custom_field_gid')
  updateCustomField(@Param('customFieldGid') customFieldGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'asana_created_field' | 'created_by' | 'created_by.name' | 'currency_code' | 'custom_label' | 'custom_label_position' | 'date_value' | 'date_value.date' | 'date_value.date_time' | 'default_access_level' | 'description' | 'display_value' | 'enabled' | 'enum_options' | 'enum_options.color' | 'enum_options.enabled' | 'enum_options.name' | 'enum_value' | 'enum_value.color' | 'enum_value.enabled' | 'enum_value.name' | 'format' | 'has_notifications_enabled' | 'id_prefix' | 'input_restrictions' | 'is_formula_field' | 'is_global_to_workspace' | 'is_value_read_only' | 'multi_enum_values' | 'multi_enum_values.color' | 'multi_enum_values.enabled' | 'multi_enum_values.name' | 'name' | 'number_value' | 'people_value' | 'people_value.name' | 'precision' | 'privacy_setting' | 'reference_value' | 'reference_value.name' | 'representation_type' | 'resource_subtype' | 'text_value' | 'type'>, @Body() updateCustomFieldRequest: UpdateCustomFieldRequest, @Req() request: Request): CreateCustomField201Response | Promise<CreateCustomField201Response> | Observable<CreateCustomField201Response> {
    return this.customFieldsApi.updateCustomField(customFieldGid, optPretty, optFields, updateCustomFieldRequest, request);
  }

  @Put('/enum_options/:enum_option_gid')
  updateEnumOption(@Param('enumOptionGid') enumOptionGid: string, @Query('optPretty') optPretty: boolean, @Query('optFields') optFields: Array<'color' | 'enabled' | 'name'>, @Body() updateEnumOptionRequest: UpdateEnumOptionRequest, @Req() request: Request): CreateEnumOptionForCustomField201Response | Promise<CreateEnumOptionForCustomField201Response> | Observable<CreateEnumOptionForCustomField201Response> {
    return this.customFieldsApi.updateEnumOption(enumOptionGid, optPretty, optFields, updateEnumOptionRequest, request);
  }

} 