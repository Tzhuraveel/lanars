import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageModel } from 'src/infra/database/entities/image.model';

import { FILE_STORAGE_SERVICE } from '#modules/file-storage/models/constants/file-storage.constants';
import { FileStorageServiceInterface } from '#modules/file-storage/models/interfaces/file-storage-service.interface';

import { ImageMapperInterface } from '../models/interfaces/image-mapper.interface';
import { ImageRepositoryInterface } from '../models/interfaces/image-repository.interface';
import { ImageServiceInterface } from '../models/interfaces/image-service.interface';
import { UploadImageInput } from '../models/types/upload-image-input.type';
import {
  IMAGE_MAPPER,
  IMAGE_REPOSITORY,
} from './../models/constants/image.constants';

@Injectable()
export class ImageService implements ImageServiceInterface {
  constructor(
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorageService: FileStorageServiceInterface,
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepositoryInterface,
    @Inject(IMAGE_MAPPER)
    private readonly imageMapper: ImageMapperInterface,
  ) {}

  async getFeed(): Promise<any[]> {
    const feed = await this.imageRepository.findFeed();

    return this.imageMapper.toFeedDtos(feed);
  }

  async upload(input: UploadImageInput): Promise<ImageModel> {
    const { file, description, portfolioId, userId } = input;

    const filePath = await this.fileStorageService.save(
      file,
      userId,
      portfolioId,
    );

    const fileUrl = this.buildImageUrl(userId, portfolioId, file.filename);

    return await this.imageRepository.upload({
      description,
      name: file.filename,
      mimeType: file.mimetype,
      filePath,
      fileUrl,
      portfolioId,
      userId,
    });
  }

  async delete(userId: number, id: number): Promise<void> {
    const image = await this.getByIdOrThrow(id);
    this.ensureImageBelongsUser(userId, image.userId);

    await this.imageRepository.deleteById(id);

    await this.fileStorageService.delete(image.filePath);
  }

  async getByIdOrThrow(id: number): Promise<ImageModel> {
    const image = await this.imageRepository.findById(id);

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return image;
  }

  ensureImageBelongsUser(userId: number, imageOwnerId: number): void {
    if (userId !== imageOwnerId) {
      throw new ForbiddenException(
        'You do not have permission to access this image',
      );
    }
  }

  buildImageUrl(userId: number, portfolioId: number, fileName: string): string {
    return `${userId}/${portfolioId}/${fileName}`;
  }
}
