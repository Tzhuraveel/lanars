import { ImageModel } from '#infra/database/entities/image.model';

import { FeedResponseDto } from '../dtos/response/feed-response.dto';
import { UploadImageInput } from '../types/upload-image-input.type';

export interface ImageServiceInterface {
  getFeed(): Promise<FeedResponseDto[]>;
  delete(userId: number, id: number): Promise<void>;
  upload(input: UploadImageInput): Promise<ImageModel>;
}
