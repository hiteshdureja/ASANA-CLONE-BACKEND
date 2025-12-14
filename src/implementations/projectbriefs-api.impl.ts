import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { ProjectBriefsApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  GetProjectBrief200Response,
  UpdateProjectBriefRequest,
} from '../generated/models';
import { ProjectBrief } from '../entities/project-brief.entity';
import { Project } from '../entities/project.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class ProjectBriefsApiImpl extends ProjectBriefsApi {
  constructor(
    @InjectRepository(ProjectBrief)
    private projectBriefRepository: Repository<ProjectBrief>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {
    super();
  }

  async createProjectBrief(
    projectGid: string,
    updateProjectBriefRequest: UpdateProjectBriefRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectBrief200Response> {
    const project = await this.projectRepository.findOne({
      where: { gid: projectGid },
    });

    if (!project) {
      throw new NotFoundException(`Project with gid ${projectGid} not found`);
    }

    const briefData = updateProjectBriefRequest.data || {};

    if (!briefData.title) {
      throw new BadRequestException('Project brief title is required');
    }

    const projectBrief = this.projectBriefRepository.create({
      gid: generateGid('project_brief'),
      title: briefData.title,
      text: briefData.text,
      htmlText: briefData.html_text,
      project: project,
    });

    const savedBrief = await this.projectBriefRepository.save(projectBrief);

    const briefWithRelations = await this.projectBriefRepository.findOne({
      where: { gid: savedBrief.gid },
      relations: ['project'],
    });

    if (!briefWithRelations) {
      throw new NotFoundException(`Project brief with gid ${savedBrief.gid} not found`);
    }

    return {
      data: {
        gid: briefWithRelations.gid,
        resource_type: 'project_brief',
        title: briefWithRelations.title,
        text: briefWithRelations.text,
        html_text: briefWithRelations.htmlText,
        permalink_url: `https://app.asana.com/0/${projectGid}/project_brief/${briefWithRelations.gid}`,
        project: {
          gid: briefWithRelations.project.gid,
          name: briefWithRelations.project.name,
        },
      },
    };
  }

  async deleteProjectBrief(
    projectBriefGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const projectBrief = await this.projectBriefRepository.findOne({
      where: { gid: projectBriefGid },
    });

    if (!projectBrief) {
      throw new NotFoundException(`Project brief with gid ${projectBriefGid} not found`);
    }

    await this.projectBriefRepository.remove(projectBrief);
    return { data: {} };
  }

  async getProjectBrief(
    projectBriefGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectBrief200Response> {
    const projectBrief = await this.projectBriefRepository.findOne({
      where: { gid: projectBriefGid },
      relations: ['project'],
    });

    if (!projectBrief) {
      throw new NotFoundException(`Project brief with gid ${projectBriefGid} not found`);
    }

    return {
      data: {
        gid: projectBrief.gid,
        resource_type: 'project_brief',
        title: projectBrief.title,
        text: projectBrief.text,
        html_text: projectBrief.htmlText,
        permalink_url: `https://app.asana.com/0/${projectBrief.project.gid}/project_brief/${projectBrief.gid}`,
        project: {
          gid: projectBrief.project.gid,
          name: projectBrief.project.name,
        },
      },
    };
  }

  async updateProjectBrief(
    projectBriefGid: string,
    updateProjectBriefRequest: UpdateProjectBriefRequest,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetProjectBrief200Response> {
    const projectBrief = await this.projectBriefRepository.findOne({
      where: { gid: projectBriefGid },
      relations: ['project'],
    });

    if (!projectBrief) {
      throw new NotFoundException(`Project brief with gid ${projectBriefGid} not found`);
    }

    const updateData = updateProjectBriefRequest.data || {};
    if (updateData.title !== undefined) projectBrief.title = updateData.title;
    if (updateData.text !== undefined) projectBrief.text = updateData.text;
    if (updateData.html_text !== undefined) projectBrief.htmlText = updateData.html_text;

    await this.projectBriefRepository.save(projectBrief);

    return {
      data: {
        gid: projectBrief.gid,
        resource_type: 'project_brief',
        title: projectBrief.title,
        text: projectBrief.text,
        html_text: projectBrief.htmlText,
        permalink_url: `https://app.asana.com/0/${projectBrief.project.gid}/project_brief/${projectBrief.gid}`,
        project: {
          gid: projectBrief.project.gid,
          name: projectBrief.project.name,
        },
      },
    };
  }
}
