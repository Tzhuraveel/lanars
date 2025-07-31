import { ImageModel } from '#infra/database/entities/image.model';

import { FeedResponseDto } from '../dtos/response/feed-response.dto';

export interface ImageMapperInterface {
  toFeedDto(image: ImageModel): FeedResponseDto;
  toFeedDtos(image: ImageModel[]): FeedResponseDto[];
}
