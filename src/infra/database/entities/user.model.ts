import {
  Column,
  DataType,
  DefaultScope,
  HasMany,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';

import { CommentModel } from './comment.model';
import { ImageModel } from './image.model';
import { PortfolioModel } from './portfolio.model';

@Table({ modelName: 'users' })
@DefaultScope(() => ({
  attributes: { exclude: ['passwordHash'] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ['passwordHash'] },
  },
}))
export class UserModel extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string;

  @HasMany(() => PortfolioModel)
  portfolios: PortfolioModel[];

  @HasMany(() => CommentModel)
  comments: Comment[];

  @HasMany(() => ImageModel)
  images: ImageModel[];
}
