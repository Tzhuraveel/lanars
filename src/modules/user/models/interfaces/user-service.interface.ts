import { UserModel } from '#infra/database/entities/user.model';

import { CreateUserInput } from '../types/create-user-input.type';

export interface UserServiceInterface {
  create(user: CreateUserInput): Promise<UserModel>;
  ensureEmailIsUnique(email: string): Promise<void>;
  delete(userId: number): Promise<void>;
}
