import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH_CONFIG_SERVICE } from '#config/auth/auth-config.constants';
import { AuthConfigServiceInterface } from '#config/auth/auth-config-service.interface';
import { UserMapper } from '#modules/user/helpers/user-mapper.helper';
import { USER_REPOSITORY } from '#modules/user/models/constants/user.constants';
import { UserData } from '#modules/user/models/types/user-data.type';
import { UserRepository } from '#modules/user/repositories/user.repository';

import { AUTH_TOKEN_REPOSITORY } from '../models/constants/auth.constants';
import { AuthTokenRepositoryInterface } from '../models/interfaces/auth-token-repository.interface';
import { JwtPayload } from '../models/types/jwt-payload.type';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(AUTH_TOKEN_REPOSITORY)
    private readonly authTokenRepository: AuthTokenRepositoryInterface,
    @Inject(AUTH_CONFIG_SERVICE)
    private readonly authConfigService: AuthConfigServiceInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: authConfigService.accessTokenSecret,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<UserData> {
    const user = await this.userRepository.findOneById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const tokenPair = await this.authTokenRepository.findByAccessToken(token);
    if (!tokenPair) {
      throw new UnauthorizedException();
    }

    return UserMapper.toData(user);
  }
}
