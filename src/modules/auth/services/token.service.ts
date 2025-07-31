import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AUTH_CONFIG_SERVICE } from '#config/auth/auth-config.constants';
import { UserData } from '#modules/user/models/types/user-data.type';

import { AuthConfigService } from '../../../config/auth/auth-config.service';
import { TokenServiceInterface } from '../models/interfaces/token-service.interface';
import { AuthTokens } from '../models/types/auth-token-response.type';
import { JwtPayload } from '../models/types/jwt-payload.type';

@Injectable()
export class TokenService implements TokenServiceInterface {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(AUTH_CONFIG_SERVICE)
    private readonly authConfigService: AuthConfigService,
  ) {}

  public async generateAuthTokens(payload: JwtPayload): Promise<AuthTokens> {
    const accessTokenSecret = this.authConfigService.accessTokenSecret;
    const accessTokenExpires = this.authConfigService.accessTokenExpiration;
    const refreshTokenSecret = this.authConfigService.refreshTokenSecret;
    const refreshTokenExpires = this.authConfigService.refreshTokenExpiration;

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload, accessTokenSecret, accessTokenExpires),
      this.generateToken(payload, refreshTokenSecret, refreshTokenExpires),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  createPayload(user: UserData): JwtPayload {
    return {
      userId: user.userId,
    };
  }

  private async generateToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, { expiresIn, secret });
  }
}
