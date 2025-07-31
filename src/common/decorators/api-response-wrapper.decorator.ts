import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseDto } from '#common/models/dtos/responses/response.dto';

interface ApiResponseOptions {
  type?: Type<unknown>;
  isArray?: boolean;
  status?: HttpStatus;
  description?: string;
}

export function ApiResponseWrapper(options?: ApiResponseOptions) {
  const decorators = [];

  decorators.push(ApiExtraModels(ResponseDto));
  if (options?.type) decorators.push(ApiExtraModels(options.type));

  const schemaData = options?.type && {
    properties: {
      data: options.isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(options.type) },
          }
        : { $ref: getSchemaPath(options.type) },
    },
  };

  decorators.push(
    ApiResponse({
      status: options?.status || HttpStatus.OK,
      description: options?.description,
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseDto) }, schemaData].filter(
          Boolean,
        ),
      },
    }),
  );

  return applyDecorators(...decorators);
}
