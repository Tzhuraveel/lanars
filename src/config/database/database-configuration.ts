import { registerAs } from '@nestjs/config';

import { validateConfig } from '#config/validate-config';

import { DatabaseEnvironmentVariablesDto } from './database-config.dto';

export default registerAs('database', () => {
  const validatedConfig = validateConfig(DatabaseEnvironmentVariablesDto);

  return {
    user: validatedConfig.DATABASE_USER,
    password: validatedConfig.DATABASE_PASSWORD,
    database: validatedConfig.DATABASE_NAME,
    port: validatedConfig.DATABASE_PORT,
    host: validatedConfig.DATABASE_HOST,
  };
});
