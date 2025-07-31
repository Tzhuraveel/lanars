import { PickType } from '@nestjs/swagger';

import { BaseAuthRequestDto } from './base-auth-request.dto';

export class LoginRequestDto extends PickType(BaseAuthRequestDto, [
  'email',
  'password',
]) {}
