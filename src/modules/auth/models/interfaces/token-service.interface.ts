import { UserData } from '#modules/user/models/types/user-data.type';

import { AuthTokens } from '../types/auth-token-response.type';
import { JwtPayload } from '../types/jwt-payload.type';

export interface TokenServiceInterface {
  generateAuthTokens(payload: JwtPayload): Promise<AuthTokens>;
  createPayload(user: UserData): JwtPayload;
}
