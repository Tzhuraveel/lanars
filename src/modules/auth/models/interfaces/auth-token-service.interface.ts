import { AuthTokenModel } from '#infra/database/entities/auth-token.mode';

import { CreateAuthTokensInput } from '../types/create-auth-tokens-input.type';

export interface AuthTokenServiceInterface {
  deleteByAccessToken(accessToken: string): Promise<void>;
  deleteAllByUserId(userId: number): Promise<void>;
  getByAccessTokenOrThrow(accessToken: string): Promise<AuthTokenModel>;
  create(input: CreateAuthTokensInput): Promise<AuthTokenModel>;
}
