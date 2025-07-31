import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class BaseAuthRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  password: string;
}
