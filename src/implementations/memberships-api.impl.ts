import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { MembershipsApi } from '../generated/api';
import {
  ApproveAccessRequest200Response,
  CreateMembership201Response,
  CreateMembershipRequest,
  GetMemberships200Response,
  UpdateMembershipRequest,
  MembershipCompact,
  NextPage,
} from '../generated/models';
import { Membership } from '../entities/membership.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { generateGid } from '../utils/gid.util';

@Injectable()
export class MembershipsApiImpl extends MembershipsApi {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async createMembership(
    optPretty: boolean,
    createMembershipRequest: CreateMembershipRequest,
    request: Request,
  ): Promise<CreateMembership201Response> {
    const membershipData = (createMembershipRequest.data || {}) as any;

    if (!membershipData.parent) {
      throw new BadRequestException('Parent is required');
    }

    if (!membershipData.member) {
      throw new BadRequestException('Member is required');
    }

    const parent = await this.projectRepository.findOne({
      where: { gid: membershipData.parent },
    });

    if (!parent) {
      throw new NotFoundException(`Parent with gid ${membershipData.parent} not found`);
    }

    const member = await this.userRepository.findOne({
      where: { gid: membershipData.member },
    });

    if (!member) {
      throw new NotFoundException(`Member with gid ${membershipData.member} not found`);
    }

    const membership = this.membershipRepository.create({
      gid: generateGid('membership'),
      accessLevel: membershipData.access_level || 'editor',
      writeAccess: membershipData.write_access !== undefined ? membershipData.write_access : true,
      parent: parent,
      member: member,
      user: member,
    });

    const savedMembership = await this.membershipRepository.save(membership);

    const membershipWithRelations = await this.membershipRepository.findOne({
      where: { gid: savedMembership.gid },
      relations: ['parent', 'member', 'user'],
    });

    if (!membershipWithRelations) {
      throw new NotFoundException(`Membership with gid ${savedMembership.gid} not found`);
    }

    return {
      data: {
        gid: membershipWithRelations.gid,
        resource_type: 'membership',
        access_level: membershipWithRelations.accessLevel as any,
        parent: membershipWithRelations.parent ? {
          gid: membershipWithRelations.parent.gid,
          name: membershipWithRelations.parent.name,
        } : undefined,
        member: {
          gid: membershipWithRelations.member.gid,
          name: membershipWithRelations.member.name,
        },
        user: {
          gid: membershipWithRelations.user.gid,
          name: membershipWithRelations.user.name,
        },
      },
    };
  }

  async deleteMembership(
    membershipGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<ApproveAccessRequest200Response> {
    const membership = await this.membershipRepository.findOne({
      where: { gid: membershipGid },
    });

    if (!membership) {
      throw new NotFoundException(`Membership with gid ${membershipGid} not found`);
    }

    await this.membershipRepository.remove(membership);
    return { data: {} };
  }

  async getMembership(
    membershipGid: string,
    optPretty: boolean,
    request: Request,
  ): Promise<CreateMembership201Response> {
    const membership = await this.membershipRepository.findOne({
      where: { gid: membershipGid },
      relations: ['parent', 'member', 'user'],
    });

    if (!membership) {
      throw new NotFoundException(`Membership with gid ${membershipGid} not found`);
    }

    return {
      data: {
        gid: membership.gid,
        resource_type: 'membership',
        access_level: membership.accessLevel as any,
        parent: membership.parent ? {
          gid: membership.parent.gid,
          name: membership.parent.name,
        } : undefined,
        member: {
          gid: membership.member.gid,
          name: membership.member.name,
        },
        user: {
          gid: membership.user.gid,
          name: membership.user.name,
        },
      },
    };
  }

  async getMemberships(
    optPretty: boolean,
    parent: string,
    member: string,
    limit: number,
    offset: string,
    optFields: any[],
    request: Request,
  ): Promise<GetMemberships200Response> {
    const query = this.membershipRepository.createQueryBuilder('membership')
      .leftJoinAndSelect('membership.parent', 'parent')
      .leftJoinAndSelect('membership.member', 'member')
      .leftJoinAndSelect('membership.user', 'user');

    if (parent) {
      query.andWhere('membership.parent.gid = :parentGid', { parentGid: parent });
    }

    if (member) {
      query.andWhere('membership.member.gid = :memberGid', { memberGid: member });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    const [memberships, total] = await query.getManyAndCount();

    return {
      data: memberships.map(m => ({
        gid: m.gid,
        resource_type: 'membership',
        access_level: m.accessLevel as any,
        write_access: m.writeAccess,
        parent: {
          gid: m.parent.gid,
          name: m.parent.name,
        },
        member: {
          gid: m.member.gid,
          name: m.member.name,
        },
        user: {
          gid: m.user.gid,
          name: m.user.name,
        },
      } as MembershipCompact)),
      next_page: offsetNum + memberships.length < total
        ? { offset: String(offsetNum + memberships.length) }
        : null,
    };
  }

  async updateMembership(
    membershipGid: string,
    updateMembershipRequest: UpdateMembershipRequest,
    optPretty: boolean,
    request: Request,
  ): Promise<CreateMembership201Response> {
    const membership = await this.membershipRepository.findOne({
      where: { gid: membershipGid },
      relations: ['parent', 'member', 'user'],
    });

    if (!membership) {
      throw new NotFoundException(`Membership with gid ${membershipGid} not found`);
    }

    const updateData = updateMembershipRequest.data || {};
    if (updateData.access_level !== undefined) membership.accessLevel = updateData.access_level;

    await this.membershipRepository.save(membership);

    return {
      data: {
        gid: membership.gid,
        resource_type: 'membership',
        access_level: membership.accessLevel as any,
        parent: membership.parent ? {
          gid: membership.parent.gid,
          name: membership.parent.name,
        } : undefined,
        member: {
          gid: membership.member.gid,
          name: membership.member.name,
        },
        user: {
          gid: membership.user.gid,
          name: membership.user.name,
        },
      },
    };
  }
}
