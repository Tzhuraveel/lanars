import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { PasswordHelper } from '#common/helpers/password.helper';
import { UserMapper } from '#modules/user/helpers/user-mapper.helper';
import { USER_REPOSITORY } from '#modules/user/models/constants/user.constants';
import { UserData } from '#modules/user/models/types/user-data.type';
import { UserRepository } from '#modules/user/repositories/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserData> {
    const user = await this.userRepository.findForAuthentication(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isEqual = await PasswordHelper.comparePassword(
      password,
      user?.passwordHash,
    );

    if (!isEqual) {
      throw new UnauthorizedException();
    }

    return UserMapper.toData(user);
  }
}
