import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_CONFIG_SERVICE } from './app-config.constants';
import { AppConfigService } from './app-config.service';
import appConfiguration from './app-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
    }),
  ],
  providers: [
    {
      provide: APP_CONFIG_SERVICE,
      useClass: AppConfigService,
    },
  ],
  exports: [APP_CONFIG_SERVICE],
})
export class AppConfigModule {}
