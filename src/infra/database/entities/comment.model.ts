import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { ImageModel } from './image.model';
import { UserModel } from './user.model';

@Table({ modelName: 'comments', timestamps: true })
export class CommentModel extends Model {
  @ForeignKey(() => ImageModel)
  @Column
  imageId: number;

  @BelongsTo(() => ImageModel, { onDelete: 'CASCADE', hooks: true })
  image: ImageModel;

  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel, { onDelete: 'CASCADE', hooks: true })
  user: UserModel;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;
}
