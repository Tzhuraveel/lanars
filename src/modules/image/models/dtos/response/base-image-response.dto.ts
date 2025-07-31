import { Expose } from 'class-transformer';

export class BaseImageResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  description: string;
}
