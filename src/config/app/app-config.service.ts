import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Environment } from '#common/models/enums/app.enum';

import appConfiguration from './app-configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfiguration.KEY)
    private configuration: ConfigType<typeof appConfiguration>,
  ) {}

  get port(): number {
    return this.configuration.port;
  }

  get environment(): Environment {
    return this.configuration.environment;
  }

  get baseS3Url(): string {
    return this.configuration.baseS3Url;
  }
}
