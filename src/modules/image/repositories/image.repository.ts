import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImageModel } from 'src/infra/database/entities/image.model';

import { ImageRepositoryInterface } from '../models/interfaces/image-repository.interface';

@Injectable()
export class ImageRepository implements ImageRepositoryInterface {
  constructor(
    @InjectModel(ImageModel)
    private readonly imageModel: typeof ImageModel,
  ) {}

  async upload(data: Partial<ImageModel>): Promise<ImageModel> {
    return await this.imageModel.create(data);
  }

  async deleteById(id: number): Promise<number> {
    return await this.imageModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<ImageModel | null> {
    return await this.imageModel.findByPk(id);
  }

  async findFeed(limit = 20, offset = 0): Promise<ImageModel[]> {
    return await this.imageModel.findAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      include: [
        {
          association: 'portfolio',
          attributes: ['name'],
        },
      ],
    });
  }
}
