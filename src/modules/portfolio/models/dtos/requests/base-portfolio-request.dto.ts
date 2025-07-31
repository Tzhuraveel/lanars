import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BasePortfolioRequestDto {
  @ApiProperty({ example: 'Life' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'Special moments in life' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  description?: string;
}
