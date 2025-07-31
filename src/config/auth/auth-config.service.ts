import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import authConfiguration from './auth-configuration';

export class AuthConfigService {
  constructor(
    @Inject(authConfiguration.KEY)
    private configuration: ConfigType<typeof authConfiguration>,
  ) {}

  get accessTokenSecret(): string {
    return this.configuration.accessTokenSecret;
  }

  get refreshTokenSecret(): string {
    return this.configuration.refreshTokenSecret;
  }

  get accessTokenExpiration(): string {
    return this.configuration.accessTokenExpiration;
  }

  get refreshTokenExpiration(): string {
    return this.configuration.refreshTokenExpiration;
  }
}
