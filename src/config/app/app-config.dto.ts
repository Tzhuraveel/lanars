import { IsEnum, IsNumber, IsString } from 'class-validator';

import { Environment } from '#common/models/enums/app.enum';

export class AppEnvironmentVariablesDto {
  @IsNumber()
  APP_PORT: number = 4000;

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.LOCAL;

  @IsString()
  BASE_S3_URL: string = 'http://localhost:4000';
}
