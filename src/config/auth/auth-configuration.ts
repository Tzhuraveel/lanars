import { registerAs } from '@nestjs/config';

import { validateConfig } from '#config/validate-config';

import { AuthEnvironmentVariablesDto } from './auth-config.dto';

export default registerAs('auth', () => {
  const validatedConfig = validateConfig(AuthEnvironmentVariablesDto);

  return {
    accessTokenSecret: validatedConfig.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: validatedConfig.REFRESH_TOKEN_SECRET,
    accessTokenExpiration: validatedConfig.ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: validatedConfig.REFRESH_TOKEN_EXPIRATION,
  };
});
