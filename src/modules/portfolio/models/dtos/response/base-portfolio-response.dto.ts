import { Exclude } from 'class-transformer';

export class BasePortfolioResponseDto {
  @Exclude()
  id: number;

  @Exclude()
  name: string;

  @Exclude()
  description?: string;
}
