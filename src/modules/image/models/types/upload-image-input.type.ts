export class UploadImageInput {
  file: Express.Multer.File;
  portfolioId: number;
  userId: number;
  description?: string;
}
