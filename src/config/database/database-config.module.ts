import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseConfigService } from './database-config.service';
import databaseConfiguration from './database-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfiguration],
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
