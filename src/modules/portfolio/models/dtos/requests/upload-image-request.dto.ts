import { IsString } from 'class-validator';

export class UploadImageRequestDto {
  @IsString()
  description?: string;
}
