import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ImageModel } from '#infra/database/entities/image.model';
import { PortfolioModel } from '#infra/database/entities/portfolio.model';
import { UserModel } from '#infra/database/entities/user.model';
import { FileStorageModule } from '#modules/file-storage/file-storage.module';
import { LocalFileInterceptor } from '#modules/file-storage/inteceptors/local-file.inteceptor';
import { ImageModule } from '#modules/image/image.module';

import {
  PORTFOLIO_REPOSITORY,
  PORTFOLIO_SERVICE,
} from './models/constants/portfolio.constants';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './repositories/portfolio.repository';
import { PortfolioService } from './services/portfolio.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, PortfolioModel, ImageModel]),
    ImageModule,
    FileStorageModule,
  ],
  controllers: [PortfolioController],
  providers: [
    { provide: PORTFOLIO_SERVICE, useClass: PortfolioService },
    { provide: PORTFOLIO_REPOSITORY, useClass: PortfolioRepository },
    LocalFileInterceptor,
  ],
})
export class PortoflioModule {}
