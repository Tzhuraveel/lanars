import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

import { DatabaseConfigModule } from './database-config.module';
import { DatabaseConfigService } from './database-config.service';

export class SequelizeConfigurationService {
  static get config(): SequelizeModuleAsyncOptions {
    return {
      imports: [DatabaseConfigModule],
      useFactory: (
        databaseConfigService: DatabaseConfigService,
      ): SequelizeModuleOptions => ({
        dialect: 'postgres',
        host: databaseConfigService.host,
        port: databaseConfigService.port,
        username: databaseConfigService.user,
        password: databaseConfigService.password,
        database: databaseConfigService.database,
        synchronize: false,
        autoLoadModels: true,
        logging: false,
      }),
      inject: [DatabaseConfigService],
    };
  }
}
