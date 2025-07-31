import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SequelizeConfigurationService } from '#config/database/sequelize-configuration.service';

@Module({
  imports: [SequelizeModule.forRootAsync(SequelizeConfigurationService.config)],
})
export class DatabaseModule {}
