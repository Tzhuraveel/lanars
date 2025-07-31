import { Inject, Injectable } from '@nestjs/common';

import { PasswordHelper } from '#common/helpers/password.helper';
import { USER_SERVICE } from '#modules/user/models/constants/user.constants';
import { UserServiceInterface } from '#modules/user/models/interfaces/user-service.interface';

import {
  AUTH_TOKEN_SERVICE,
  TOKEN_SERVICE,
} from '../models/constants/auth.constants';
import { SignUpRequestDto } from '../models/dtos/request/sign-up-request.dto';
import { TokensResponseDto } from '../models/dtos/response/tokens-response.dto';
import { AuthServiceInterface } from '../models/interfaces/auth-service.interface';
import { AuthTokenServiceInterface } from '../models/interfaces/auth-token-service.interface';
import { TokenServiceInterface } from '../models/interfaces/token-service.interface';
import { JwtPayload } from '../models/types/jwt-payload.type';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenServiceInterface,
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
    @Inject(AUTH_TOKEN_SERVICE)
    private readonly authTokenService: AuthTokenServiceInterface,
  ) {}

  async login(userId: number): Promise<TokensResponseDto> {
    const payload = this.tokenService.createPayload({ userId });

    await this.authTokenService.deleteAllByUserId(userId);

    const tokens = await this.tokenService.generateAuthTokens(payload);

    await this.authTokenService.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userId,
    });

    return tokens;
  }

  async signUp(dto: SignUpRequestDto): Promise<TokensResponseDto> {
    const { email, password } = dto;

    await this.userService.ensureEmailIsUnique(email);

    const passwordHash = await PasswordHelper.hashPassword(password);

    const user = await this.userService.create({
      email,
      passwordHash,
    });

    const payload: JwtPayload = {
      userId: user.id,
    };

    const tokens = await this.tokenService.generateAuthTokens(payload);

    await this.authTokenService.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userId: user.id,
    });

    return tokens;
  }

  async refresh(userId: number): Promise<TokensResponseDto> {
    const payload = this.tokenService.createPayload({ userId });

    await this.authTokenService.deleteAllByUserId(userId);

    const tokens = await this.tokenService.generateAuthTokens(payload);

    await this.authTokenService.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userId,
    });

    return tokens;
  }

  async logout(userId: number): Promise<void> {
    await this.authTokenService.deleteAllByUserId(userId);
  }
}
