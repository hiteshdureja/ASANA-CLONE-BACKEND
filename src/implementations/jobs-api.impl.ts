import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { JobsApi } from '../generated/api';
import {
  GetJob200Response,
} from '../generated/models';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobsApiImpl extends JobsApi {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {
    super();
  }

  async getJob(
    jobGid: string,
    optPretty: boolean,
    optFields: any[],
    request: Request,
  ): Promise<GetJob200Response> {
    const job = await this.jobRepository.findOne({
      where: { gid: jobGid },
    });

    if (!job) {
      throw new NotFoundException(`Job with gid ${jobGid} not found`);
    }

    return {
      data: {
        gid: job.gid,
        resource_type: 'job',
        resource_subtype: job.resourceSubtype as any,
        status: job.status as any,
        new_task: job.newTask,
        new_project: job.newProject,
        new_project_template: job.newProjectTemplate,
        new_resource_export: job.newResourceExport,
        new_graph_export: job.newGraphExport,
      },
    };
  }
}
