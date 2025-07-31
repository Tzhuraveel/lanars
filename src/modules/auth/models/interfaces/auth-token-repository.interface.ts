import { AuthTokenModel } from '#infra/database/entities/auth-token.mode';

export interface AuthTokenRepositoryInterface {
  deleteByAccessToken(accessToken: string): Promise<number>;
  deleteAllByUserId(userId: number): Promise<void>;
  findByAccessToken(accessToken: string): Promise<AuthTokenModel>;
  findByRefreshToken(refreshToken: string): Promise<AuthTokenModel>;
  create(data: Partial<AuthTokenModel>): Promise<AuthTokenModel>;
}
