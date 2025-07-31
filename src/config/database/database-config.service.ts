import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import databaseConfiguration from './database-configuration';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(databaseConfiguration.KEY)
    private configuration: ConfigType<typeof databaseConfiguration>,
  ) {}

  get user(): string {
    return this.configuration.user;
  }
  get password(): string {
    return this.configuration.password;
  }

  get database(): string {
    return this.configuration.database;
  }

  get port(): number {
    return this.configuration.port;
  }

  get host(): string {
    return this.configuration.host;
  }
}
