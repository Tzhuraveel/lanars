import { ApiProperty } from '@nestjs/swagger';

import { ResponseStatus } from '#common/models/enums/response-status.enum';

export class ResponseDto<T = unknown> {
  @ApiProperty({ example: ResponseStatus.SUCCESS, enum: ResponseStatus })
  status: ResponseStatus;

  @ApiProperty()
  messages: string[];

  @ApiProperty({ required: false, nullable: true })
  data?: T;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: '/lanars' })
  path: string;

  @ApiProperty({ example: '2025-07-31T07:06:05.988Z' })
  timestamp: string;
}
