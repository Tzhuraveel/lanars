import { ImageModel } from '#infra/database/entities/image.model';

export interface ImageRepositoryInterface {
  upload(data: Partial<ImageModel>): Promise<ImageModel>;
  deleteById(id: number): Promise<number>;
  findById(id: number): Promise<ImageModel | null>;
  findFeed(): Promise<ImageModel[]>;
}
