import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppConfigModule } from '#config/app/app-config.module';
import { AuthConfigModule } from '#config/auth/auth-config.module';
import { AuthTokenModel } from '#infra/database/entities/auth-token.mode';
import { UserModel } from '#infra/database/entities/user.model';
import { UserModule } from '#modules/user/user.module';

import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import {
  AUTH_SERVICE,
  AUTH_TOKEN_REPOSITORY,
  AUTH_TOKEN_SERVICE,
  TOKEN_SERVICE,
} from './models/constants/auth.constants';
import { AuthTokenRepository } from './repositories/user-token.repository';
import { AuthService } from './services/auth.service';
import { AuthTokenService } from './services/auth-token.service';
import { TokenService } from './services/token.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    AuthConfigModule,
    AppConfigModule,
    UserModule,
    SequelizeModule.forFeature([AuthTokenModel, UserModel]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: AUTH_TOKEN_SERVICE,
      useClass: AuthTokenService,
    },
    {
      provide: AUTH_TOKEN_REPOSITORY,
      useClass: AuthTokenRepository,
    },
    AccessTokenGuard,
    LocalAuthGuard,
    RefreshTokenGuard,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
