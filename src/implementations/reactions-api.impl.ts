import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { ReactionsApi } from '../generated/api';
import {
  GetReactionsOnObject200Response,
  ReactionCompact,
  NextPage,
} from '../generated/models';
import { Reaction } from '../entities/reaction.entity';
import { Task } from '../entities/task.entity';

@Injectable()
export class ReactionsApiImpl extends ReactionsApi {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super();
  }

  async getReactionsOnObject(
    target: string,
    emojiBase: string,
    optPretty: boolean,
    limit: number,
    offset: string,
    request: Request,
  ): Promise<GetReactionsOnObject200Response> {
    // Target is typically a task GID
    const task = await this.taskRepository.findOne({
      where: { gid: target },
    });

    if (!task) {
      throw new NotFoundException(`Target object with gid ${target} not found`);
    }

    const query = this.reactionRepository.createQueryBuilder('reaction')
      .where('reaction.target.id = :taskId', { taskId: task.id })
      .leftJoinAndSelect('reaction.user', 'user');

    if (emojiBase) {
      query.andWhere('reaction.emojiBase = :emojiBase', { emojiBase });
    }

    const offsetNum = offset ? parseInt(offset, 10) : 0;
    query.skip(offsetNum);
    if (limit) {
      query.take(limit);
    }

    query.orderBy('reaction.createdAt', 'DESC');

    const [reactions, total] = await query.getManyAndCount();

    return {
      data: reactions.map(r => ({
        gid: r.gid,
        resource_type: 'reaction',
        emoji_base: r.emojiBase,
        resource_subtype: r.resourceSubtype as any,
        user: {
          gid: r.user.gid,
          name: r.user.name,
        },
      } as ReactionCompact)),
      next_page: offsetNum + reactions.length < total
        ? { offset: String(offsetNum + reactions.length) }
        : null,
    };
  }
}
