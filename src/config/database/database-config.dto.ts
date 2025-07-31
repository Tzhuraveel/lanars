import { IsNumber, IsString } from 'class-validator';

export class DatabaseEnvironmentVariablesDto {
  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_HOST: string;
}
