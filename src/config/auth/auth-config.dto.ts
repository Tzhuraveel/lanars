import { IsString } from 'class-validator';

export class AuthEnvironmentVariablesDto {
  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  REFRESH_TOKEN_SECRET: string;

  @IsString()
  ACCESS_TOKEN_EXPIRATION: string;

  @IsString()
  REFRESH_TOKEN_EXPIRATION: string;
}
