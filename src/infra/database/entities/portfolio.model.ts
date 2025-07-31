import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { ImageModel } from './image.model';
import { UserModel } from './user.model';

@Table({ modelName: 'portfolios', timestamps: true })
export class PortfolioModel extends Model {
  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel, { onDelete: 'CASCADE', hooks: true })
  user: UserModel;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @HasMany(() => ImageModel)
  images: ImageModel[];
}
