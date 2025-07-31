import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { ApiResponseWrapper } from '#common/decorators/api-response-wrapper.decorator';
import { ResponseMessage } from '#common/decorators/response-message.decorator';
import { UserData } from '#modules/user/models/types/user-data.type';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AUTH_SERVICE } from './models/constants/auth.constants';
import { LoginRequestDto } from './models/dtos/request/login-request.dto';
import { SignUpRequestDto } from './models/dtos/request/sign-up-request.dto';
import { TokensResponseDto } from './models/dtos/response/tokens-response.dto';
import { AuthServiceInterface } from './models/interfaces/auth-service.interface';

@Controller({ path: 'auth' })
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponseWrapper({ status: HttpStatus.CREATED, type: TokensResponseDto })
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() _dto: LoginRequestDto,
    @CurrentUser() user: UserData,
  ): Promise<TokensResponseDto> {
    return await this.authService.login(user.userId);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponseWrapper({ status: HttpStatus.CREATED, type: TokensResponseDto })
  @SkipAuth()
  async signUp(@Body() dto: SignUpRequestDto): Promise<TokensResponseDto> {
    return await this.authService.signUp(dto);
  }

  @ResponseMessage('User succesfully logouted')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponseWrapper({ status: HttpStatus.CREATED })
  @Post('logout')
  async logout(@CurrentUser() user: UserData): Promise<void> {
    return await this.authService.logout(user.userId);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @SkipAuth()
  @ApiResponseWrapper({ status: HttpStatus.CREATED, type: TokensResponseDto })
  @UseGuards(RefreshTokenGuard)
  async refresh(@CurrentUser() user: UserData): Promise<TokensResponseDto> {
    return await this.authService.refresh(user.userId);
  }
}
