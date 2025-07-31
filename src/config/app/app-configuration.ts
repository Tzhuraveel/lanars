import { registerAs } from '@nestjs/config';

import { validateConfig } from '#config/validate-config';

import { AppEnvironmentVariablesDto } from './app-config.dto';

export default registerAs('app', () => {
  const validatedConfig = validateConfig(AppEnvironmentVariablesDto);

  return {
    port: validatedConfig.APP_PORT,
    environment: validatedConfig.NODE_ENV,
    baseS3Url: validatedConfig.BASE_S3_URL,
  };
});
