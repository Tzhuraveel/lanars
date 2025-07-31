import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { AuthTokenModel } from '#infra/database/entities/auth-token.mode';

import { AUTH_TOKEN_REPOSITORY } from '../models/constants/auth.constants';
import { AuthTokenRepositoryInterface } from '../models/interfaces/auth-token-repository.interface';
import { AuthTokenServiceInterface } from '../models/interfaces/auth-token-service.interface';
import { CreateAuthTokensInput } from '../models/types/create-auth-tokens-input.type';

@Injectable()
export class AuthTokenService implements AuthTokenServiceInterface {
  constructor(
    @Inject(AUTH_TOKEN_REPOSITORY)
    private readonly authTokenRepository: AuthTokenRepositoryInterface,
  ) {}

  async deleteByAccessToken(accessToken: string): Promise<void> {
    await this.authTokenRepository.deleteByAccessToken(accessToken);
  }

  async deleteAllByUserId(userId: number): Promise<void> {
    await this.authTokenRepository.deleteAllByUserId(userId);
  }

  async getByAccessTokenOrThrow(accessToken: string): Promise<AuthTokenModel> {
    const userToken =
      await this.authTokenRepository.findByAccessToken(accessToken);

    if (!userToken) {
      throw new NotFoundException('Token not found');
    }

    return userToken;
  }

  async create(input: CreateAuthTokensInput): Promise<AuthTokenModel> {
    const { userId, accessToken, refreshToken } = input;

    return await this.authTokenRepository.create({
      userId,
      accessToken,
      refreshToken,
    });
  }
}
