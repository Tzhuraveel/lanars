import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResponseWrapper } from '#common/decorators/api-response-wrapper.decorator';
import { ResponseMessage } from '#common/decorators/response-message.decorator';
import { Serialize } from '#common/decorators/serialize.decorator';
import { CurrentUser } from '#modules/auth/decorators/current-user.decorator';
import { SkipAuth } from '#modules/auth/decorators/skip-auth.decorator';
import { UserData } from '#modules/user/models/types/user-data.type';

import { IMAGE_SERVICE } from './models/constants/image.constants';
import { FeedResponseDto } from './models/dtos/response/feed-response.dto';
import { ImageServiceInterface } from './models/interfaces/image-service.interface';

@ApiTags('Image')
@ApiBearerAuth()
@Controller({ path: 'images' })
export class ImageController {
  constructor(
    @Inject(IMAGE_SERVICE) private readonly imageService: ImageServiceInterface,
  ) {}

  @Get('feed')
  @SkipAuth()
  @ApiOperation({ summary: 'Get public image feed' })
  @Serialize(FeedResponseDto)
  @ApiResponseWrapper({ type: FeedResponseDto, isArray: true })
  async getFeed(): Promise<FeedResponseDto[]> {
    return await this.imageService.getFeed();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an image' })
  @ApiResponseWrapper()
  @ResponseMessage('Image succesfully deleted')
  async delete(
    @CurrentUser() user: UserData,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.imageService.delete(user.userId, id);
  }
}
