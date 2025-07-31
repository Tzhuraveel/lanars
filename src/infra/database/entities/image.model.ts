import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { CommentModel } from './comment.model';
import { PortfolioModel } from './portfolio.model';
import { UserModel } from './user.model';

@Table({ modelName: 'images', timestamps: true })
export class ImageModel extends Model {
  @ForeignKey(() => PortfolioModel)
  @Column({ allowNull: false })
  portfolioId: number;

  @BelongsTo(() => PortfolioModel, { onDelete: 'CASCADE', hooks: true })
  portfolio: PortfolioModel;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fileUrl: string;

  @Column({ type: DataType.STRING, allowNull: false })
  filePath: string;

  @Column({ type: DataType.STRING, allowNull: false })
  mimeType: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @HasMany(() => CommentModel)
  comments: CommentModel[];
}
