import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AUTH_CONFIG_SERVICE } from './auth-config.constants';
import { AuthConfigService } from './auth-config.service';
import authConfiguration from './auth-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
    }),
  ],
  providers: [
    {
      provide: AUTH_CONFIG_SERVICE,
      useClass: AuthConfigService,
    },
  ],
  exports: [AUTH_CONFIG_SERVICE],
})
export class AuthConfigModule {}
