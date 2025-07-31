import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PORTFOLIO_DELETED } from '#modules/portfolio/models/constants/portfolio-events';
import { USER_DELETED } from '#modules/user/models/constants/user-events';

import { FILE_STORAGE_SERVICE } from '../models/constants/file-storage.constants';
import { FileStorageServiceInterface } from '../models/interfaces/file-storage-service.interface';
import {
  PortfolioDeletedEventPayload,
  UserDeletedEventPayload,
} from '../models/types/file-storage-listener-payload.type';

@Injectable()
export class FileStorageListener {
  constructor(
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorageService: FileStorageServiceInterface,
  ) {}

  @OnEvent(USER_DELETED, { async: true })
  async removeUserFolder(payload: UserDeletedEventPayload): Promise<void> {
    await this.fileStorageService.deleteUserFolder(payload.userId);
  }

  @OnEvent(PORTFOLIO_DELETED, { async: true })
  async removePortfolioFolder(
    payload: PortfolioDeletedEventPayload,
  ): Promise<void> {
    await this.fileStorageService.deletePortfolioFolder(
      payload.userId,
      payload.portfolioId,
    );
  }
}
