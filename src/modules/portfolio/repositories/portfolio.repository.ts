import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PortfolioModel } from 'src/infra/database/entities/portfolio.model';

import { PortfolioRepositoryInterface } from '../models/interfaces/portfolio-repository.interface';

@Injectable()
export class PortfolioRepository implements PortfolioRepositoryInterface {
  constructor(
    @InjectModel(PortfolioModel)
    private readonly portfolioModel: typeof PortfolioModel,
  ) {}

  async create(data: Partial<PortfolioModel>): Promise<PortfolioModel> {
    return await this.portfolioModel.create(data);
  }

  async findAllByUser(userId: number): Promise<PortfolioModel[]> {
    return await this.portfolioModel.findAll({ where: { userId } });
  }

  async findById(id: number): Promise<PortfolioModel | null> {
    return await this.portfolioModel.findByPk(id);
  }

  async findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<PortfolioModel | null> {
    return await this.portfolioModel.findOne({ where: { id, userId } });
  }

  async deleteById(id: number): Promise<number> {
    return await this.portfolioModel.destroy({ where: { id } });
  }

  async updateById(id: number, data: Partial<PortfolioModel>): Promise<void> {
    await this.portfolioModel.update(data, { where: { id } });
  }
}
