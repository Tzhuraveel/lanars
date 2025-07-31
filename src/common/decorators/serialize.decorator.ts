import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import { SerializationInterceptor } from '#common/interceptors/serialization.interceptor';

export function Serialize(classConstructor: ClassConstructor<unknown>) {
  return UseInterceptors(new SerializationInterceptor(classConstructor));
}
