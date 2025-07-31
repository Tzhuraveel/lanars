import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BaseImageResponseDto } from './base-image-response.dto';

class PortfolioDto {
  @Expose()
  name: string;
}

export class FeedResponseDto extends PickType(BaseImageResponseDto, [
  'id',
  'name',
  'description',
  'imageUrl',
]) {
  @Expose()
  @Type(() => PortfolioDto)
  portfolio: PortfolioDto;
}
