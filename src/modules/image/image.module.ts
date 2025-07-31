import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppConfigModule } from '#config/app/app-config.module';
import { ImageModel } from '#infra/database/entities/image.model';
import { PortfolioModel } from '#infra/database/entities/portfolio.model';
import { FileStorageModule } from '#modules/file-storage/file-storage.module';

import { ImageController } from './image.controller';
import {
  IMAGE_MAPPER,
  IMAGE_REPOSITORY,
  IMAGE_SERVICE,
} from './models/constants/image.constants';
import { ImageRepository } from './repositories/image.repository';
import { ImageMapper } from './services/image.mapper';
import { ImageService } from './services/image.service';

@Module({
  imports: [
    SequelizeModule.forFeature([PortfolioModel, ImageModel]),
    FileStorageModule,
    AppConfigModule,
  ],
  controllers: [ImageController],
  providers: [
    { provide: IMAGE_SERVICE, useClass: ImageService },
    { provide: IMAGE_REPOSITORY, useClass: ImageRepository },
    { provide: IMAGE_MAPPER, useClass: ImageMapper },
  ],
  exports: [IMAGE_SERVICE],
})
export class ImageModule {}
