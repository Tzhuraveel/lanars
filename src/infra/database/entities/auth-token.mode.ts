import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { UserModel } from './user.model';

@Table({ tableName: 'auth-tokens', timestamps: true })
export class AuthTokenModel extends Model {
  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel, { onDelete: 'CASCADE', hooks: true })
  user: UserModel;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Index
  accessToken: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  refreshToken: string;
}
