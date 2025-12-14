import { User } from '../entities/user.entity';
import { UserResponse } from '../generated/models';
import { filterFields } from '../utils/field-filter.util';

export class UserMapper {
  static toResponse(
    user: User,
    optFields?: string[],
  ): UserResponse {
    const response: any = {
      gid: user.gid,
      resource_type: 'user',
      name: user.name,
      email: user.email,
      photo: user.photo,
    };

    if (user.workspaces) {
      response.workspaces = user.workspaces.map((ws) => ({
        gid: ws.gid,
        name: ws.name,
      }));
    }

    return filterFields(response, optFields) as UserResponse;
  }
}

