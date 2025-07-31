import { SetMetadata } from '@nestjs/common';

import { SKIP_AUTH } from '../models/constants/auth.constants';

export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
