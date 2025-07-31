import { Controller, Delete, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResponseWrapper } from '#common/decorators/api-response-wrapper.decorator';
import { ResponseMessage } from '#common/decorators/response-message.decorator';
import { CurrentUser } from '#modules/auth/decorators/current-user.decorator';
import { UserData } from '#modules/user/models/types/user-data.type';

import { USER_SERVICE } from './models/constants/user.constants';
import { UserServiceInterface } from './models/interfaces/user-service.interface';

@Controller({ path: 'users' })
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) {}

  @Delete('me')
  @ApiOperation({ summary: 'Delete current user' })
  @ApiResponseWrapper()
  @ResponseMessage('User successfully deleted')
  async refresh(@CurrentUser() user: UserData): Promise<void> {
    return await this.userService.delete(user.userId);
  }
}
