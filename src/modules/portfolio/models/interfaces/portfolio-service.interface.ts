import { PortfolioModel } from '#infra/database/entities/portfolio.model';

import { CreatePortfolioRequestDto } from '../dtos/requests/create-portfolio-request.dto';
import { UploadImageInput } from '../types/upload-image-input.type';

export interface PortfolioServiceInterface {
  create(userId: number, dto: CreatePortfolioRequestDto): Promise<void>;

  getByIdOrThrow(userId: number): Promise<PortfolioModel>;

  delete(userId: number, id: number): Promise<void>;

  uploadImage(input: UploadImageInput): Promise<void>;
}
