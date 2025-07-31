import { SetMetadata } from '@nestjs/common';

import { SKIP_RESPONSE_MAP } from '#common/models/constants/constants';

export const SkipResponseMap = () => SetMetadata(SKIP_RESPONSE_MAP, true);
