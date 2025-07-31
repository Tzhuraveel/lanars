import { Request, Response } from 'express';

import { ResponseDto } from '#common/models/dtos/responses/response.dto';
import { ResponseStatus } from '#common/models/enums/response-status.enum';

export class ResponseHelper {
  static toResponse<T>(
    req: Request,
    res: Response,
    messages: string[],
    data?: T,
  ): ResponseDto<T> {
    const statusCode = res.statusCode;

    return {
      status: this.getStatusFromCode(statusCode),
      messages,
      data,
      statusCode,
      path: req.path,
      timestamp: new Date().toISOString(),
    };
  }

  static getStatusFromCode(statusCode: number): ResponseStatus {
    switch (true) {
      case statusCode >= 200 && statusCode < 400:
        return ResponseStatus.SUCCESS;
      case statusCode >= 400 && statusCode < 500:
        return ResponseStatus.FAIL;
      default:
        return ResponseStatus.ERROR;
    }
  }
}
