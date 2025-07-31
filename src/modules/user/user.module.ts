import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ImageModel } from '#infra/database/entities/image.model';
import { PortfolioModel } from '#infra/database/entities/portfolio.model';
import { UserModel } from '#infra/database/entities/user.model';

import { CommentModel } from './../../infra/database/entities/comment.model';
import {
  USER_REPOSITORY,
  USER_SERVICE,
} from './models/constants/user.constants';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      PortfolioModel,
      CommentModel,
      ImageModel,
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule {}
