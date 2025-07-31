import { UserModel } from '#infra/database/entities/user.model';

import { UserData } from '../models/types/user-data.type';

export class UserMapper {
  static toData(user: UserModel | null): UserData {
    return {
      userId: user.id,
    };
  }
}
