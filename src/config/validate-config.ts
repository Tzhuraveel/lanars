import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateConfig<T>(dto: ClassConstructor<T>): T {
  const validatedConfig = plainToClass(dto, process.env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
