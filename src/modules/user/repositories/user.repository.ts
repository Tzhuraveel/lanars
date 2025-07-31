import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserModel } from '#infra/database/entities/user.model';

import { UserRepositoryInterface } from '../models/interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async findOneById(id: number): Promise<UserModel | null> {
    return await this.userModel.findByPk(id);
  }

  async create(input: Partial<UserModel>): Promise<UserModel> {
    return await this.userModel.create(input);
  }

  async findForAuthentication(email: string): Promise<UserModel | null> {
    return await this.userModel.scope('withPassword').findOne({
      where: { email },
    });
  }

  async existsBy(filter: Partial<UserModel>): Promise<boolean> {
    const count = await this.userModel.count({
      where: filter,
    });
    return count > 0;
  }

  async delete(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
