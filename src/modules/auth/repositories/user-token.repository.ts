import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AuthTokenModel } from '#infra/database/entities/auth-token.mode';

import { AuthTokenRepositoryInterface } from '../models/interfaces/auth-token-repository.interface';

@Injectable()
export class AuthTokenRepository implements AuthTokenRepositoryInterface {
  constructor(
    @InjectModel(AuthTokenModel)
    private readonly authTokenModel: typeof AuthTokenModel,
  ) {}

  async findByAccessToken(accessToken: string): Promise<AuthTokenModel | null> {
    return await this.authTokenModel.findOne({ where: { accessToken } });
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthTokenModel> {
    return await this.authTokenModel.findOne({ where: { refreshToken } });
  }

  async deleteByAccessToken(accessToken: string): Promise<number> {
    return await this.authTokenModel.destroy({ where: { accessToken } });
  }

  async deleteAllByUserId(userId: number): Promise<void> {
    await this.authTokenModel.destroy({ where: { userId } });
  }

  async create(data: Partial<AuthTokenModel>): Promise<AuthTokenModel> {
    return await this.authTokenModel.create(data);
  }
}
