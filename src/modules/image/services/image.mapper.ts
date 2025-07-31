import { Inject, Injectable } from '@nestjs/common';

import { APP_CONFIG_SERVICE } from '#config/app/app-config.constants';
import { AppConfigService } from '#config/app/app-config.service';
import { ImageModel } from '#infra/database/entities/image.model';
import { STORAGE_DIR } from '#modules/file-storage/models/constants/file-storage.constants';

import { FeedResponseDto } from '../models/dtos/response/feed-response.dto';
import { ImageMapperInterface } from '../models/interfaces/image-mapper.interface';

@Injectable()
export class ImageMapper implements ImageMapperInterface {
  constructor(
    @Inject(APP_CONFIG_SERVICE)
    private readonly appConfigService: AppConfigService,
  ) {}

  toFeedDto(image: ImageModel): FeedResponseDto {
    return {
      id: image.id,
      name: image.name,
      description: image.description,
      imageUrl: `${this.appConfigService.baseS3Url}/${STORAGE_DIR}/${image.fileUrl}`,
      portfolio: {
        name: image.portfolio?.name,
      },
    };
  }

  toFeedDtos(images: ImageModel[]): FeedResponseDto[] {
    return images.map((image) => this.toFeedDto(image));
  }
}
