import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { SectionsApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  GetSection200Response,
  GetSectionsForProject200Response,
  InsertSectionForProjectRequest,
  SectionCompact,
  UpdateSectionRequest,
  AddTaskForSectionRequest,
} from '../generated/models';
import { Section } from '../entities/section.entity';
import { Project } from '../entities/project.entity';
import { SectionMapper } from '../mappers/section.mapper';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class SectionsApiImpl extends SectionsApi {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {
    super();
  }

  async addTaskForSection(
    sectionGid: string,
    optPretty: boolean,
    addTaskForSectionRequest: AddTaskForSectionRequest,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    // TODO: Implement addTaskForSection
    throw new Error('Method not implemented.');
  }

  async createSectionForProject(
    projectGid: string,
    optPretty: boolean,
    optFields: any[],
    updateSectionRequest: UpdateSectionRequest,
    request: Request,
  ): Promise<GetSection200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const sectionData = (updateSectionRequest.data || {}) as any;

    if (!sectionData.name) {
      throw new BadRequestException('Section name is required');
    }

    const section = this.sectionRepository.create({
      gid: generateGid('section'),
      name: sectionData.name,
      project: project,
    });
    const savedSection = await this.sectionRepository.save(section);

    const sectionWithRelations = await this.sectionRepository.findOne({
      where: { gid: savedSection.gid },
      relations: ['project'],
    });

    if (!sectionWithRelations) {
      throw new NotFoundException(`Section with gid ${savedSection.gid} not found`);
    }

    return {
      data: SectionMapper.toResponse(sectionWithRelations, optFields),
    };
  }

  async deleteSection(
    sectionGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const section = await this.sectionRepository.findOne({
      where: { gid: sectionGid },
    });

    if (!section) {
      throw new NotFoundException(`Section with gid ${sectionGid} not found`);
    }

    await this.sectionRepository.remove(section);
    return { data: {} };
  }

  async getSection(
    sectionGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetSection200Response> {
    const section = await this.sectionRepository.findOne({
      where: { gid: sectionGid },
      relations: ['project'],
    });

    if (!section) {
      throw new NotFoundException(`Section with gid ${sectionGid} not found`);
    }

    return {
      data: SectionMapper.toResponse(section, optFields),
    };
  }

  async getSectionsForProject(
    projectGid: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetSectionsForProject200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['sections'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const sections = project.sections || [];
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const paginatedSections = sections.slice(offsetNum, offsetNum + (limit || 100));

    return {
      data: paginatedSections.map(s => ({
        gid: s.gid,
        resource_type: 'section',
        name: s.name,
      } as SectionCompact)),
    };
  }

  async insertSectionForProject(
    projectGid: string,
    optPretty: boolean,
    insertSectionForProjectRequest: InsertSectionForProjectRequest,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
      relations: ['sections'],
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const sectionData = (insertSectionForProjectRequest.data || {}) as any;
    const section = this.sectionRepository.create({
      gid: generateGid('section'),
      name: sectionData.name,
      project: project,
    });
    const savedSection = await this.sectionRepository.save(section);

    return {} as ApproveAccessRequest200Response;
  }

  async updateSection(
    sectionGid: string,
    optPretty: boolean,
    optFields: any[],
    updateSectionRequest: UpdateSectionRequest,
    request: Request,
  ): Promise<GetSection200Response> {
    const section = await this.sectionRepository.findOne({
      where: { gid: sectionGid },
      relations: ['project'],
    });

    if (!section) {
      throw new NotFoundException(`Section with gid ${sectionGid} not found`);
    }

    const updateData = (updateSectionRequest.data || {}) as any;
    if (updateData.name !== undefined) section.name = updateData.name;

    await this.sectionRepository.save(section);

    return {
      data: SectionMapper.toResponse(section, optFields),
    };
  }
}
