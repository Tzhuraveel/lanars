import { UserModel } from '#infra/database/entities/user.model';

export interface UserRepositoryInterface {
  create(user: Partial<UserModel>): Promise<UserModel>;
  findOneById(id: number): Promise<UserModel | null>;
  findForAuthentication(email: string): Promise<UserModel | null>;
  existsBy(filter: Partial<UserModel>): Promise<boolean>;
  delete(id: number): Promise<void>;
}
