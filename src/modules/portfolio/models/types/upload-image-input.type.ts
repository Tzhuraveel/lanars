import { UploadImageRequestDto } from '../dtos/requests/upload-image-request.dto';

export class UploadImageInput {
  userId: number;
  portfolioId: number;
  file: Express.Multer.File;
  dto: UploadImageRequestDto;
}
