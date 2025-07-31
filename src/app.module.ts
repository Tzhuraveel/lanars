import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

import { GlobalExceptionFilter } from '#common/filters';
import { ResponseMapInterceptor } from '#common/interceptors/response-map.interceptor';
import { DatabaseModule } from '#infra/database/database.module';
import { AccessTokenGuard } from '#modules/auth/guards/access-token.guard';
import { STORAGE_DIR } from '#modules/file-storage/models/constants/file-storage.constants';
import { ImageModule } from '#modules/image/image.module';
import { PortoflioModule } from '#modules/portfolio/portfolio.module';

import { AppConfigModule } from './config/app/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    PortoflioModule,
    ImageModule,
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), STORAGE_DIR),
      serveRoot: `/${STORAGE_DIR}`,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMapInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
