import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { CustomFieldsApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  CreateCustomField201Response,
  CreateCustomFieldRequest,
  CreateEnumOptionForCustomField201Response,
  CreateEnumOptionForCustomFieldRequest,
  GetCustomFieldsForWorkspace200Response,
  InsertEnumOptionForCustomFieldRequest,
  UpdateCustomFieldRequest,
  UpdateEnumOptionRequest,
  CustomFieldCompact,
  NextPage,
} from '../generated/models';
import { CustomField, EnumOption } from '../entities/custom-field.entity';
import { Workspace } from '../entities/workspace.entity';
import { User } from '../entities/user.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class CustomFieldsApiImpl extends CustomFieldsApi {
  constructor(
    @InjectRepository(CustomField)
    private customFieldRepository: Repository<CustomField>,
    @InjectRepository(EnumOption)
    private enumOptionRepository: Repository<EnumOption>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async createCustomField(
    createCustomFieldRequest: CreateCustomFieldRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateCustomField201Response> {
    const fieldData = createCustomFieldRequest.data || {} as any;

    if (!fieldData.name) {
      throw new BadRequestException('Custom field name is required');
    }

    if (!fieldData.type) {
      throw new BadRequestException('Custom field type is required');
    }

    if (!fieldData.workspace) {
      throw new BadRequestException('Workspace is required');
    }

    const workspace = await this.workspaceRepository.findOne({
      where: { gid: fieldData.workspace },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${fieldData.workspace} not found`);
    }

    const customField = this.customFieldRepository.create({
      gid: generateGid('custom_field'),
      name: fieldData.name,
      type: fieldData.type,
      description: fieldData.description,
      enabled: fieldData.enabled !== undefined ? fieldData.enabled : true,
      isGlobalToWorkspace: fieldData.is_global_to_workspace || false,
      isFormulaField: fieldData.is_formula_field || false,
      isValueReadOnly: fieldData.is_value_read_only || false,
      format: fieldData.format,
      currencyCode: fieldData.currency_code,
      precision: fieldData.precision,
      defaultAccessLevel: fieldData.default_access_level,
      privacySetting: fieldData.privacy_setting,
      customLabel: fieldData.custom_label,
      customLabelPosition: fieldData.custom_label_position,
      hasNotificationsEnabled: fieldData.has_notifications_enabled || false,
      resourceSubtype: fieldData.resource_subtype,
      representationType: fieldData.representation_type,
      workspace: workspace,
    });

    const savedField = await this.customFieldRepository.save(customField);

    const fieldWithRelations = await this.customFieldRepository.findOne({
      where: { gid: savedField.gid },
      relations: ['workspace', 'createdBy'],
    });

    if (!fieldWithRelations) {
      throw new NotFoundException(`Custom field with gid ${savedField.gid} not found`);
    }

    return {
      data: {
        gid: fieldWithRelations.gid,
        resource_type: 'custom_field',
        name: fieldWithRelations.name,
        type: fieldWithRelations.type as any,
        description: fieldWithRelations.description,
        enabled: fieldWithRelations.enabled,
        is_global_to_workspace: fieldWithRelations.isGlobalToWorkspace,
        is_formula_field: fieldWithRelations.isFormulaField,
        is_value_read_only: fieldWithRelations.isValueReadOnly,
        format: fieldWithRelations.format as any,
        currency_code: fieldWithRelations.currencyCode,
        precision: fieldWithRelations.precision,
        default_access_level: fieldWithRelations.defaultAccessLevel as any,
        privacy_setting: fieldWithRelations.privacySetting as any,
        custom_label: fieldWithRelations.customLabel,
        custom_label_position: fieldWithRelations.customLabelPosition as any,
        has_notifications_enabled: fieldWithRelations.hasNotificationsEnabled,
        resource_subtype: fieldWithRelations.resourceSubtype as any,
        representation_type: fieldWithRelations.representationType as any,
      },
    };
  }

  async createEnumOptionForCustomField(
    customFieldGid: string,
    optPretty: boolean,
    optFields: any[],
    createEnumOptionForCustomFieldRequest: CreateEnumOptionForCustomFieldRequest,
    request: Request,
  ): Promise<CreateEnumOptionForCustomField201Response> {
    const customField = await this.customFieldRepository.findOne({
      where: { gid: customFieldGid },
    });

    if (!customField) {
      throw new NotFoundException(`Custom field with gid ${customFieldGid} not found`);
    }

    const optionData = createEnumOptionForCustomFieldRequest.data || {};

    if (!optionData.name) {
      throw new BadRequestException('Enum option name is required');
    }

    const enumOption = this.enumOptionRepository.create({
      gid: generateGid('enum_option'),
      name: optionData.name,
      color: optionData.color,
      enabled: optionData.enabled !== undefined ? optionData.enabled : true,
      customField: customField,
    });

    const savedOption = await this.enumOptionRepository.save(enumOption);

    return {
      data: {
        gid: savedOption.gid,
        resource_type: 'enum_option',
        name: savedOption.name,
        color: savedOption.color as any,
        enabled: savedOption.enabled,
      },
    };
  }

  async deleteCustomField(
    customFieldGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const customField = await this.customFieldRepository.findOne({
      where: { gid: customFieldGid },
    });

    if (!customField) {
      throw new NotFoundException(`Custom field with gid ${customFieldGid} not found`);
    }

    await this.customFieldRepository.remove(customField);
    return { data: {} };
  }

  async getCustomField(
    customFieldGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<CreateCustomField201Response> {
    const customField = await this.customFieldRepository.findOne({
      where: { gid: customFieldGid },
      relations: ['workspace', 'createdBy'],
    });

    if (!customField) {
      throw new NotFoundException(`Custom field with gid ${customFieldGid} not found`);
    }

    const enumOptions = await this.enumOptionRepository.find({
      where: { customField: { id: customField.id } },
    });

    return {
      data: {
        gid: customField.gid,
        resource_type: 'custom_field',
        name: customField.name,
        type: customField.type as any,
        description: customField.description,
        enabled: customField.enabled,
        is_global_to_workspace: customField.isGlobalToWorkspace,
        is_formula_field: customField.isFormulaField,
        is_value_read_only: customField.isValueReadOnly,
        format: customField.format as any,
        currency_code: customField.currencyCode,
        precision: customField.precision,
        default_access_level: customField.defaultAccessLevel as any,
        privacy_setting: customField.privacySetting as any,
        custom_label: customField.customLabel,
        custom_label_position: customField.customLabelPosition as any,
        has_notifications_enabled: customField.hasNotificationsEnabled,
        resource_subtype: customField.resourceSubtype as any,
        representation_type: customField.representationType as any,
        enum_options: enumOptions.map(opt => ({
          gid: opt.gid,
          name: opt.name,
          color: opt.color as any,
          enabled: opt.enabled,
        })),
      },
    };
  }

  async getCustomFieldsForWorkspace(
    workspaceGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetCustomFieldsForWorkspace200Response> {
    const workspace = await this.workspaceRepository.findOne({
      where: { gid: workspaceGid },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with gid ${workspaceGid} not found`);
    }

    const query = this.customFieldRepository.createQueryBuilder('field')
      .where('field.workspace.id = :workspaceId', { workspaceId: workspace.id })
      .leftJoinAndSelect('field.workspace', 'workspace')
      .leftJoinAndSelect('field.createdBy', 'createdBy');

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [fields, total] = await query.getManyAndCount();

    return {
      data: fields.map(f => ({
        gid: f.gid,
        resource_type: 'custom_field',
        name: f.name,
        type: f.type as any,
        enabled: f.enabled,
        is_global_to_workspace: f.isGlobalToWorkspace,
      } as CustomFieldCompact)),
      next_page: offsetNum + fields.length < total
        ? { offset: String(offsetNum + fields.length) }
        : null,
    };
  }

  async insertEnumOptionForCustomField(
    customFieldGid: string,
    optPretty: boolean,
    optFields: any[],
    insertEnumOptionForCustomFieldRequest: InsertEnumOptionForCustomFieldRequest,
    request: Request,
  ): Promise<CreateEnumOptionForCustomField201Response> {
    // Similar to createEnumOptionForCustomField but with position
    return this.createEnumOptionForCustomField(
      customFieldGid,
      optPretty,
      optFields,
      insertEnumOptionForCustomFieldRequest as any,
      request,
    );
  }

  async updateCustomField(
    customFieldGid: string,
    optPretty: boolean,
    optFields: any[],
    updateCustomFieldRequest: UpdateCustomFieldRequest,
    request: Request,
  ): Promise<CreateCustomField201Response> {
    const customField = await this.customFieldRepository.findOne({
      where: { gid: customFieldGid },
      relations: ['workspace', 'createdBy'],
    });

    if (!customField) {
      throw new NotFoundException(`Custom field with gid ${customFieldGid} not found`);
    }

    const updateData = (updateCustomFieldRequest.data || {}) as any;
    if (updateData.name !== undefined) customField.name = updateData.name;
    if (updateData.description !== undefined) customField.description = updateData.description;
    if (updateData.enabled !== undefined) customField.enabled = updateData.enabled;
    if (updateData.is_global_to_workspace !== undefined) customField.isGlobalToWorkspace = updateData.is_global_to_workspace;
    if (updateData.format !== undefined) customField.format = updateData.format;
    if (updateData.currency_code !== undefined) customField.currencyCode = updateData.currency_code;
    if (updateData.precision !== undefined) customField.precision = updateData.precision;
    if (updateData.default_access_level !== undefined) customField.defaultAccessLevel = updateData.default_access_level;
    if (updateData.privacy_setting !== undefined) customField.privacySetting = updateData.privacy_setting;

    await this.customFieldRepository.save(customField);

    return this.getCustomField(customFieldGid, optPretty, optFields, request);
  }

  async updateEnumOption(
    enumOptionGid: string,
    optPretty: boolean,
    optFields: any[],
    updateEnumOptionRequest: UpdateEnumOptionRequest,
    request: Request,
  ): Promise<CreateEnumOptionForCustomField201Response> {
    const enumOption = await this.enumOptionRepository.findOne({
      where: { gid: enumOptionGid },
      relations: ['customField'],
    });

    if (!enumOption) {
      throw new NotFoundException(`Enum option with gid ${enumOptionGid} not found`);
    }

    const updateData = updateEnumOptionRequest.data || {};
    if (updateData.name !== undefined) enumOption.name = updateData.name;
    if (updateData.color !== undefined) enumOption.color = updateData.color;
    if (updateData.enabled !== undefined) enumOption.enabled = updateData.enabled;

    await this.enumOptionRepository.save(enumOption);

    return {
      data: {
        gid: enumOption.gid,
        resource_type: 'enum_option',
        name: enumOption.name,
        color: enumOption.color as any,
        enabled: enumOption.enabled,
      },
    };
  }
}
