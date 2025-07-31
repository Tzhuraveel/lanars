import { PickType } from '@nestjs/swagger';

import { BaseAuthRequestDto } from './base-auth-request.dto';

export class SignUpRequestDto extends PickType(BaseAuthRequestDto, [
  'email',
  'password',
]) {}
