import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
  constructor(private classConstructor: ClassConstructor<unknown>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(map((dto) => this.serialize(dto)));
  }

  private serialize(dto: unknown) {
    return plainToInstance(this.classConstructor, dto, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}
