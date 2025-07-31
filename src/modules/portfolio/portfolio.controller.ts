import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiResponseWrapper } from '#common/decorators/api-response-wrapper.decorator';
import { ResponseMessage } from '#common/decorators/response-message.decorator';
import { CurrentUser } from '#modules/auth/decorators/current-user.decorator';
import { LocalFileInterceptor } from '#modules/file-storage/inteceptors/local-file.inteceptor';
import { UploadImageRequestDto } from '#modules/portfolio/models/dtos/requests/upload-image-request.dto';
import { UserData } from '#modules/user/models/types/user-data.type';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { PORTFOLIO_SERVICE } from './models/constants/portfolio.constants';
import { CreatePortfolioRequestDto } from './models/dtos/requests/create-portfolio-request.dto';
import { PortfolioServiceInterface } from './models/interfaces/portfolio-service.interface';

@ApiBearerAuth()
@Controller({ path: 'portfolios' })
@ApiTags('Portfolios')
@UseGuards(AccessTokenGuard)
export class PortfolioController {
  constructor(
    @Inject(PORTFOLIO_SERVICE)
    private readonly portfolioService: PortfolioServiceInterface,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create portfolio' })
  @ResponseMessage('Portfolio successfully created')
  @ApiResponseWrapper({ status: 201 })
  async create(
    @CurrentUser() user: UserData,
    @Body() dto: CreatePortfolioRequestDto,
  ): Promise<void> {
    await this.portfolioService.create(user.userId, dto);
  }

  @Patch(':id/images')
  @ApiOperation({ summary: 'Upload image to portfolio' })
  @ResponseMessage('File successfully uploaded to portfolio')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        ['file']: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
          example: 'A beautiful sunset',
        },
      },
    },
  })
  @ApiResponseWrapper()
  @UseInterceptors(LocalFileInterceptor)
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserData,
    @Body() dto: UploadImageRequestDto,
  ): Promise<void> {
    await this.portfolioService.uploadImage({
      portfolioId: id,
      userId: user.userId,
      file,
      dto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete portfolio' })
  @ResponseMessage('Portfolio successfully deleted')
  @ApiResponseWrapper()
  async delete(
    @CurrentUser() user: UserData,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.portfolioService.delete(user.userId, id);
  }
}
